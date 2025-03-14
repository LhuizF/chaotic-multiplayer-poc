import { Creature } from "@/cards/creatures"

export interface GameMatch {
  id: string
  createdAt: string
  players: {
    [key: string]: Player
  }
  status: MatchStatus
  playerTurn: string
  game: Game
}

export interface Player {
  id: string
  playerName: string
}

type MatchStatus = 'waiting' | 'playing' | 'finished'

interface Game {
  status: GameStatus
  players: {
    [key: string]: {
      handCards: Creature[]
      boardCreatures: CreatureSelected[]
      status: GamePlayerStatus
    }
  }
}

type GameStatus = 'choosing_creatures' | 'battle' | 'finished'

export type GamePlayerStatus = 'choosing_creatures' | 'ready' | 'battle'

interface CreatureSelected extends Creature {
  position: { row: number, column: number }
}

export interface UpdatePlayerGame {
  playerId: string
  handCards: Creature[]
  boardCreatures: CreatureSelected[]
}
