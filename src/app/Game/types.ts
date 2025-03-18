import { Creature } from "@/cards/creatures"

export interface GameMatchInfo {
  id: string
  createdAt: string
  opponent: PlayerInGame
  player: PlayerInGame
  status: 'waiting' | 'playing' | 'finished'
  isYourTurn: boolean
  gameStatus: GameStatus
}

export type GameStatus = 'choosing_creatures' | 'select_duel' | 'duel'

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

export interface Duel {
  playerCreature: CreatureSelected
  opponentCreature: CreatureSelected
}
