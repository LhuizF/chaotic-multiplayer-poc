import { GameMatch, Player, UpdatePlayerGame } from "./types";

export interface IGameService {
  createGameMatch(matchId: string, player: Player): Promise<void>;
  getMatch(matchId: string): Promise<GameMatch | null>;
  joinGame(matchId: string, player: Player): Promise<boolean>;
  listenGame(matchId: string, callback: (gameData: GameMatch) => void): () => void;
  updatePlayerGame(matchId: string, playerGame: UpdatePlayerGame): Promise<void>;
}
