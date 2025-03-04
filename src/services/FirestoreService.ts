import { Firestore, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from './firebase'

interface GameInitPayload {
  createdAt: string
  players: {
    [key: string]: {
      id: string
      playerName: string
    }
  }
}

class FirestoreService {
  private readonly database: Firestore

  constructor(database: Firestore) {
    this.database = database
  }

  async create(id: string, data: GameInitPayload) {
    const matchRef = doc(this.database, 'games', id);
    await setDoc(matchRef, data);
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
