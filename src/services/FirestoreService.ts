import { Firestore, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from './firebase'

interface Player {
  id: string
  playerName: string
}

interface Game {
  id: string
  createdAt: string
  players: {
    [key: string]: Player
  }
  status: 'waiting' | 'playing' | 'finished'
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
      status: 'waiting'
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

  listenGame(id: string, callback: (gameData: any) => void) {
    const gameRef = doc(this.database, 'games', id);

    return onSnapshot(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      }
    }
    );
  }
}

export const firestoreService = new FirestoreService(firestore)
