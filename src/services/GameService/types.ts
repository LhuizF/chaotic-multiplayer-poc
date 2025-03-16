import { Creature } from "@/cards/creatures"
import { Attack } from "@/cards/attacks"

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
  duels: Duel[]
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

export interface Duel {
  [key: string]: {
    creature: CreatureSelected
    attacks: {
      turn: number
      cardAttack: Attack
      damage: number
    }[]
  }
}
