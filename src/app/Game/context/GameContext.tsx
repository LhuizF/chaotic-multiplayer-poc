import { createContext, useContext, useEffect, useState } from "react";
import { FirestoreService, Game } from "@/services/FirestoreService";
import { GameMatch } from "../types";

type GameContextData = {
  gameMatch: GameMatch;
  isLoading: boolean;
  passTurn: () => Promise<void>;
};

const defaultGameMatch: GameMatch = {
  id: '',
  createdAt: '',
  adversary: {
    id: '',
    name: ''
  },
  status: 'waiting',
  isYourTurn: false,
  battlefield: {
    status: 'choosing_creatures',
    players: {}
  }
};

const GameContext = createContext<GameContextData>({ isLoading: true, gameMatch: defaultGameMatch, passTurn: async () => {} });

interface GameProviderProps {
  children: React.ReactNode;
  firestoreService: FirestoreService
  gameId: string;
  userId: string;
}

function GameContextProvider({ children, firestoreService, gameId, userId }: GameProviderProps) {
  const [gameMatch, setGameMatch] = useState<GameMatch>(defaultGameMatch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestoreService.listenGame(gameId, (gameData: Game) => {
      if (!gameData) {
        return;
      }

      const adversary = Object.values(gameData.players).find((player) => player.id !== userId);

      if (!adversary) {
        return;
      }

      const isYourTurn = gameData.turn === userId;

      const match: GameMatch = {
        id: gameData.id,
        createdAt: gameData.createdAt,
        adversary: {
          id: adversary.id,
          name: adversary.playerName
        },
        status: gameData.status,
        isYourTurn,
        battlefield: gameData.battlefield
      }

      setGameMatch(match);
      setIsLoading(false);
    });

    return () => unsubscribe()

  }, [gameId, userId]);

  const passTurn = async () => {
    if (!gameMatch.isYourTurn) {
      return;
    }

    await firestoreService.passTurn(gameId, gameMatch.adversary.id);
  }

  return (
    <GameContext.Provider value={{ gameMatch, isLoading, passTurn }}>
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
