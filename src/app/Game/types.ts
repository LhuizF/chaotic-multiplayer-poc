import { Creature } from "@/cards/creatures"

export interface GameMatchInfo {
  id: string
  createdAt: string
  opponent: PlayerInGame
  player: PlayerInGame
  status: 'waiting' | 'playing' | 'finished'
  isYourTurn: boolean
  gameStatus: 'choosing_creatures' | 'battle' | 'finished'
}

export interface PlayerInGame {
  id: string
  name: string
  handCards: Creature[]
  boardCreatures: CreatureSelected[]
  status: PlayerStatus
}

type PlayerStatus = 'choosing_creatures' | 'ready' | 'battle'

export interface CreatureSelected extends Creature {
  position: Position
}

export interface Position {
  row: number
  column: number
}
