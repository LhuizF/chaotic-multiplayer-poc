import { CreatureSelected, DuelRound, GamePlayer } from "../types"

export interface UpdatePlayerDuel {
  playerId: string
  player: GamePlayer
  duelRound: DuelRound
  opponent: {
    id: string
    creature: CreatureSelected
  }
}
