import { Creature } from "@/cards/creatures"
import { Attack } from "@/cards/attacks"

export interface GameMatch {
  id: string
  createdAt: string
  players: Record<string, Player>
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
  players: Record<string, GamePlayer>
  duels: Duel[]
}

type GameStatus = 'choosing_creatures' | 'select_duel' | 'duel'

export type GamePlayerStatus = 'choosing_creatures' | 'ready' | 'battle'

export interface CreatureSelected extends Creature {
  position: { row: number, column: number }
}

export interface Duel {
  rounds: DuelRound[];
  players: Record<string, PlayerDuel>
}

interface PlayerDuel {
  creature: CreatureSelected
}

export interface GamePlayer {
  handCreatures: Creature[]
  handAttacks: Attack[]
  deck: Attack[]
  boardCreatures: CreatureSelected[]
  status: GamePlayerStatus
}

export interface DuelRound {
  roundNumber: number
  playerId: string
  attack: Attack
  damage: number
}

// dtos
export interface UpdatePlayerGame {
  playerId: string
  handCreatures: Creature[]
  boardCreatures: CreatureSelected[]
}

export interface UpdatePlayerAttack {
  playerId: string
  handAttacks: Attack[]
  deck: Attack[]
  attack: Attack
  playersDuel: PlayersDuel
}

export interface PlayersDuel {
  [playerId: string]: {
    creature: CreatureSelected
  }
}
