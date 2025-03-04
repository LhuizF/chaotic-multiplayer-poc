import { db } from './firebase'
import { Database, ref, set } from "firebase/database";

interface GameInitPayload {
  createdAt: string
  players: {
    [key: string]: {
      id: string
      playerName: string
    }
  }
}

class RealtimeService {
  private readonly database: Database

  constructor(database: Database) {
    this.database = database
  }

  create(id: string, data: GameInitPayload) {
    const dbRef = ref(this.database, id);

    set(dbRef, data);
  }
}

export const realtimeService = new RealtimeService(db)
