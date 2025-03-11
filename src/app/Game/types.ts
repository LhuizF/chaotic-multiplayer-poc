import { Creature } from "@/cards/creatures"

export interface GameMatch {
  id: string
  createdAt: string
  opponent: {
    id: string
    name: string
  }
  player: {
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
    [key: string]: PlayerBattlefield
  }
}

export interface PlayerBattlefield {
  creatures: {
    initialCreatures: Creature[]
    selectedCreatures: CreatureSelected[]
  }
}

export interface CreatureSelected extends Creature {
  position: Position
}

export interface Position {
  row: number
  column: number
}


export interface PlayerGame {
  id: string
  name: string
  creaturesInBoard: CreatureSelected[]
  creaturesInHand: Creature[]
}
