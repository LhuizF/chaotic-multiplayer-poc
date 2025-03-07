export interface GameMatch {
  id: string
  createdAt: string
  opponent: {
    id: string
    name: string
  }
  status: 'waiting' | 'playing' | 'finished'
  isYourTurn: boolean
  battlefield: Battlefield
}

export interface Battlefield {
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

export interface CreatureSelected extends Creature {
  position: { row: number, column: number }
}

export interface Creature {
  id: string
  name: string
  image: string
  power: number
  health: number
}
