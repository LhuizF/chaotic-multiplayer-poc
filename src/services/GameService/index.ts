import { Firestore, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Creature, creatures } from '@/cards/creatures'
import { Attack, attacks } from '@/cards/attacks'
import { IGameService } from './IGameService';
import { GameMatch, Player, PlayersDuel, UpdatePlayerGame } from "./types";
import { UpdatePlayerDuel } from './dtos/UpdatePlayerDuel.dto'

class GameService implements IGameService {
  private readonly collectionName = 'game-matches';
  private readonly inicialCreatures: Creature[] = creatures
  private readonly inicialAttacks: Attack[] = attacks

  constructor(private readonly firestore: Firestore) {}

  async createGameMatch(matchId: string, player: Player): Promise<void> {
    const data: GameMatch = {
      id: matchId,
      createdAt: new Date().toISOString(),
      players: {
        [player.id]: player
      },
      status: 'waiting',
      playerTurn: player.id,
      game: {
        status: 'choosing_creatures',
        players: {
          [player.id]: {
            handAttacks: [],
            handCreatures: this.inicialCreatures,
            boardCreatures: [],
            deck: [],
            status: 'choosing_creatures'
          }
        },
        duels: []
      }
    }

    const matchRef = doc(this.firestore, this.collectionName, matchId);
    await setDoc(matchRef, data);
  }

  async getMatch(matchId: string): Promise<GameMatch | null> {
    const matchRef = doc(this.firestore, this.collectionName, matchId);
    const matchSnapshot = await getDoc(matchRef);

    if (matchSnapshot.exists()) {
      return matchSnapshot.data() as GameMatch;
    }

    return null;
  }

  async joinGame(matchId: string, player: Player): Promise<boolean> {
    const matchRef = doc(this.firestore, this.collectionName, matchId);
    const matchSnapshot = await getDoc(matchRef);

    if (matchSnapshot.exists()) {
      const gameMatch = matchSnapshot.data() as GameMatch;

      if (gameMatch.status === 'waiting') {
        const gameUpdate: GameMatch = {
          ...gameMatch,
          players: {
            ...gameMatch.players,
            [player.id]: player
          },
          status: 'playing',
          game: {
            ...gameMatch.game,
            players: {
              ...gameMatch.game.players,
              [player.id]: {
                handCreatures: this.inicialCreatures,
                handAttacks: [],
                boardCreatures: [],
                deck: [],
                status: 'choosing_creatures'
              }
            }
          }
        }

        await setDoc(matchRef, gameUpdate);

        return true;
      }

      return false;
    }

    return false;
  }

  async updatePlayerGame(matchId: string, playerGame: UpdatePlayerGame): Promise<void> {
    const matchRef = doc(this.firestore, this.collectionName, matchId);
    const matchSnapshot = await getDoc(matchRef);

    if (matchSnapshot.exists()) {
      const match = matchSnapshot.data() as GameMatch;

      await setDoc(matchRef, {
        ...match,
        game: {
          ...match.game,
          players: {
            ...match.game.players,
            [playerGame.playerId]: {
              ...match.game.players[playerGame.playerId],
              handCreatures: playerGame.handCreatures,
              boardCreatures: playerGame.boardCreatures,
            }
          }
        }
      });
    }
  }

  listenGame(id: string, callback: (gameData: GameMatch) => void) {
    const matchRef = doc(this.firestore, this.collectionName, id);

    return onSnapshot(matchRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as GameMatch);
      }
    });
  }

  async finishChoicePhase(matchId: string, playerId: string, updateGameStatus: boolean): Promise<void> {
    const matchRef = doc(this.firestore, this.collectionName, matchId);
    const matchSnapshot = await getDoc(matchRef);

    if (matchSnapshot.exists()) {
      const match = matchSnapshot.data() as GameMatch;

      const matchUpdate: GameMatch = {
        ...match,
        game: {
          ...match.game,
          players: {
            ...match.game.players,
            [playerId]: {
              boardCreatures: match.game.players[playerId].boardCreatures,
              handCreatures: [],
              handAttacks: [],
              deck: [],
              status: 'ready'
            }
          }
        }
      };

      if (updateGameStatus) {
        matchUpdate.game.status = 'select_duel';
        Object.entries(matchUpdate.game.players).forEach(([key, value]) => {
          matchUpdate.game.players[key] = {
            ...value,
            status: 'battle'
          }
        });
      }

      await setDoc(matchRef, matchUpdate);
    }
  }

  async startNewDuel(matchId: string, playersDuel: PlayersDuel, playerTurnId: string): Promise<void> {
    const matchRef = doc(this.firestore, this.collectionName, matchId);
    const matchSnapshot = await getDoc(matchRef);

    if (matchSnapshot.exists()) {
      const match = matchSnapshot.data() as GameMatch;

      const newDuel = {
        players: playersDuel,
        rounds: [],
        playerTurnId
      }

      const updateGameMatch: GameMatch = {
        ...match,
        game: {
          ...match.game,
          status: 'duel',
          duels: [
            ...match.game.duels,
            newDuel
          ]
        }
      }

      Object.entries(updateGameMatch.game.players).map(([key, value]) => {
        const { hand, deck } = this.initializePlayerDeck()
        updateGameMatch.game.players[key] = {
          ...value,
          handAttacks: hand,
          deck: deck
        }
      })

      await setDoc(matchRef, updateGameMatch);
    }
  }

  private initializePlayerDeck() {
    const shuffled = [...this.inicialAttacks]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    const hand = shuffled.slice(0, 2)
    const deck = shuffled.slice(2)

    return { hand, deck }
  }

  async updatePlayerDuel(matchId: string, updatePlayerDuel: UpdatePlayerDuel): Promise<void> {
    const matchRef = doc(this.firestore, this.collectionName, matchId);
    const matchSnapshot = await getDoc(matchRef);

    if (matchSnapshot.exists()) {
      const match = matchSnapshot.data() as GameMatch;

      const updateGameMatch: GameMatch = { ...match }

      updateGameMatch.game.players[updatePlayerDuel.playerId] = updatePlayerDuel.player

      if (updatePlayerDuel.player.handAttacks.length === 0) {
        const { hand, deck } = this.initializePlayerDeck()
        updateGameMatch.game.players[updatePlayerDuel.playerId] = {
          ...updatePlayerDuel.player,
          handAttacks: hand,
          deck: deck
        }
      }

      const currentDuel = updateGameMatch.game.duels[updateGameMatch.game.duels.length - 1]
      currentDuel.rounds.push(updatePlayerDuel.duelRound)

      currentDuel.players[updatePlayerDuel.opponent.id] = {
        creature: updatePlayerDuel.opponent.creature
      }

      currentDuel.playerTurnId = updatePlayerDuel.opponent.id

      updateGameMatch.game.duels[updateGameMatch.game.duels.length - 1] = currentDuel

      if (updatePlayerDuel.opponent.creature.health === 0) {
        updateGameMatch.game.status = 'select_duel'

        const newUserTurn = updateGameMatch.playerTurn === updatePlayerDuel.playerId
          ? updatePlayerDuel.opponent.id
          : updatePlayerDuel.playerId

        updateGameMatch.playerTurn = newUserTurn

        const opponentBoard = updateGameMatch.game.players[updatePlayerDuel.opponent.id].boardCreatures

        const newBoard = opponentBoard.filter(creature => creature.id !== updatePlayerDuel.opponent.creature.id)

        updateGameMatch.game.players[updatePlayerDuel.opponent.id].boardCreatures = newBoard

        if (newBoard.length === 0) {
          updateGameMatch.playerWinner = updateGameMatch.players[updatePlayerDuel.playerId]
          updateGameMatch.status = 'finished'
        }
      }

      await setDoc(matchRef, updateGameMatch);
    }
  }
}

export const gameService = new GameService(firestore)
