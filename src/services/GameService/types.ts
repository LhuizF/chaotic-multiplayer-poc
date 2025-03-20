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
    [key: string]: playerGame
  }
  duels: Duel[]
}

type GameStatus = 'choosing_creatures' | 'select_duel' | 'duel'

export type GamePlayerStatus = 'choosing_creatures' | 'ready' | 'battle'

interface CreatureSelected extends Creature {
  position: { row: number, column: number }
}

export interface UpdatePlayerGame {
  playerId: string
  handCreatures: Creature[]
  boardCreatures: CreatureSelected[]
}

export interface Duel {
  [playerId: string]: {
    creature: CreatureSelected
    attacks: {
      turn: number
      cardAttack: Attack
      damage: number
    }[]
  }
}

interface playerGame {
  handCreatures: Creature[]
  handAttacks: Attack[]
  deck: Attack[]
  boardCreatures: CreatureSelected[]
  status: GamePlayerStatus
}
