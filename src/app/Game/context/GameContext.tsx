import { createContext, useContext, useEffect, useState } from "react";
import { IGameService } from "@/services/GameService/IGameService";
import { GameMatchInfo, PlayerInGame, Position, CreatureSelected } from "../types";
import { GameMatch } from "../../../services/GameService/types";

type GameContextData = {
  gameMatchInfo: GameMatchInfo;
  isLoading: boolean;
  player: PlayerInGame,
  opponent: PlayerInGame,
  gameService: IGameService;
  getCardByPosition: (position: Position) => CreatureSelected | null
  hasCardInPosition: (position: Position) => boolean
};

const defaultPlayer: PlayerInGame = {
  id: '',
  name: '',
  status: 'choosing_creatures',
  handCards: [],
  boardCreatures: []
}

const defaultGameMatch: GameMatchInfo = {
  id: '',
  createdAt: '',
  player: defaultPlayer,
  opponent: defaultPlayer,
  status: 'waiting',
  isYourTurn: false,
  gameStatus: 'choosing_creatures'
};

const GameContext = createContext<GameContextData>({
  isLoading: true,
  gameMatchInfo: defaultGameMatch,
  player: defaultPlayer,
  opponent: defaultPlayer,
  getCardByPosition: () => null,
  hasCardInPosition: () => false,
  gameService: {} as IGameService
});

interface GameProviderProps {
  children: React.ReactNode;
  gameService: IGameService;
  matchId: string;
  userId: string;
}

function GameContextProvider({ children, gameService, matchId, userId }: GameProviderProps) {
  const [gameMatch, setGameMatch] = useState<GameMatchInfo>(defaultGameMatch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = gameService.listenGame(matchId, (gameData: GameMatch) => {
      if (!gameData) {
        return;
      }

      const opponent = Object.values(gameData.players).find((player) => player.id !== userId);

      if (!opponent) {
        return;
      }

      const isYourTurn = gameData.playerTurn === userId;

      const player: PlayerInGame = {
        id: userId,
        name: gameData.players[userId].playerName,
        handCards: gameData.game.players[userId].handCards,
        boardCreatures: gameData.game.players[userId].boardCreatures,
        status: gameData.game.players[userId].status
      };
      const opponentPlayer: PlayerInGame = {
        id: opponent.id,
        name: opponent.playerName,
        handCards: gameData.game.players[opponent.id].handCards,
        boardCreatures: gameData.game.players[opponent.id].boardCreatures,
        status: gameData.game.players[opponent.id].status
      };

      const match: GameMatchInfo = {
        id: gameData.id,
        createdAt: gameData.createdAt,
        player: player,
        opponent: opponentPlayer,
        status: gameData.status,
        isYourTurn,
        gameStatus: gameData.game.status
      }

      setGameMatch(match);
      setIsLoading(false);
    });

    return () => unsubscribe()

  }, [matchId, userId]);

  const player = gameMatch.player;
  const opponent = gameMatch.opponent;

  const getCardByPosition = (position: Position): CreatureSelected | null => {
    const card = player.boardCreatures.find((creature) =>
      creature.position.column === position.column && creature.position.row === position.row)

    return card || null
  }

  const hasCardInPosition = (position: Position): boolean => {
    return opponent.boardCreatures.some((creature) =>
      creature.position.column === position.column && creature.position.row === position.row)
  }

  return (
    <GameContext.Provider value={{
      gameMatchInfo: gameMatch,
      isLoading,
      player,
      opponent,
      gameService,
      getCardByPosition,
      hasCardInPosition
    }}>
      {children}
    </GameContext.Provider>
  );
}

const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('GameContextProvider not found');
  }

  return context;
};

export { useGame, GameContextProvider };
