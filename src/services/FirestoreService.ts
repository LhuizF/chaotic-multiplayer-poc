import { Firestore, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from './firebase'
import { creatures, Creature } from '@/cards/creatures'

interface Player {
  id: string
  playerName: string
}

export type GameStatus = 'waiting' | 'playing' | 'finished'

export interface Game {
  id: string
  createdAt: string
  players: {
    [key: string]: Player
  }
  status: GameStatus
  turn: string
  battlefield: Battlefield
}

interface CreatureSelected extends Creature {
  position: { row: number, column: number }
}

interface Battlefield {
  status: 'choosing_creatures'
  players: {
    [key: string]: {
      creatures: {
        initialCreatures: Creature[]
        selectedCreatures: CreatureSelected[]
      }
    }
  }
}

export class FirestoreService {
  private readonly database: Firestore

  constructor(database: Firestore) {
    this.database = database
  }

  async create(id: string, player: Player) {
    const data: Game = {
      id,
      createdAt: new Date().toISOString(),
      players: {
        [player.id]: player
      },
      status: 'waiting',
      turn: player.id,
      battlefield: this.createBattlefield(player.id)
    }

    const matchRef = doc(this.database, 'games', id);
    await setDoc(matchRef, data);
  }

  async getGame(id: string): Promise<Game | null> {
    const gameRef = doc(this.database, 'games', id);
    const gameSnapshot = await getDoc(gameRef);

    if (gameSnapshot.exists()) {
      return gameSnapshot.data() as Game;
    }

    return null;
  }

  async joinGame(id: string, player: Player): Promise<boolean> {
    const gameRef = doc(this.database, 'games', id);
    const gameSnapshot = await getDoc(gameRef);

    if (gameSnapshot.exists()) {
      const game = gameSnapshot.data() as Game;

      if (game.status === 'waiting') {
        const gameUpdate: Game = {
          ...game,
          players: {
            ...game.players,
            [player.id]: player
          },
          status: 'playing',
          battlefield: {
            ...game.battlefield,
            players: {
              ...game.battlefield.players,
              [player.id]: {
                creatures: {
                  initialCreatures: creatures,
                  selectedCreatures: []
                }
              }
            }
          }
        }

        await setDoc(gameRef, gameUpdate);

        return true;
      }

      return false;
    }

    return false;
  }

  listenGame(id: string, callback: (gameData: Game) => void) {
    const gameRef = doc(this.database, 'games', id);

    return onSnapshot(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as Game);
      }
    });
  }

  async passTurn(id: string, nextPlayerId: string) {
    const gameRef = doc(this.database, 'games', id);
    const gameSnapshot = await getDoc(gameRef);

    if (gameSnapshot.exists()) {
      const game = gameSnapshot.data() as Game;

      await setDoc(gameRef, {
        ...game,
        turn: nextPlayerId
      });
    }
  }

  private createBattlefield(userId: string): Battlefield {
    const battlefield: Battlefield = {
      status: 'choosing_creatures',
      players: {
        [userId]: {
          creatures: {
            initialCreatures: creatures,
            selectedCreatures: []
          }
        }
      }
    }

    return battlefield;
  }
}

export const firestoreService = new FirestoreService(firestore)
