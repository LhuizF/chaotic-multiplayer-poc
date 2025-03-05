import { Firestore, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from './firebase'

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
}

class FirestoreService {
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
      turn: player.id
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
        const newPlayers = {
          ...game.players,
          [player.id]: player
        }

        await setDoc(gameRef, {
          ...game,
          status: 'playing',
          players: newPlayers
        });

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
}

export const firestoreService = new FirestoreService(firestore)
