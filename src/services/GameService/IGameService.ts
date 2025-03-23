import { GameMatch, Player, PlayersDuel, UpdatePlayerGame } from "./types";
import { UpdatePlayerDuel } from './dtos/UpdatePlayerDuel.dto'

export interface IGameService {
  createGameMatch(matchId: string, player: Player): Promise<void>;
  getMatch(matchId: string): Promise<GameMatch | null>;
  joinGame(matchId: string, player: Player): Promise<boolean>;
  listenGame(matchId: string, callback: (gameData: GameMatch) => void): () => void;
  updatePlayerGame(matchId: string, playerGame: UpdatePlayerGame): Promise<void>;
  finishChoicePhase(matchId: string, playerId: string, updateGameStatus: boolean): Promise<void>;
  startNewDuel(matchId: string, playersDuel: PlayersDuel, playerTurnId: string): Promise<void>;
  updatePlayerDuel(matchId: string, updatePlayerDuel: UpdatePlayerDuel): Promise<void>;
}
