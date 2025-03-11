import { createContext, useContext, useEffect, useState } from "react";
import { FirestoreService, Game } from "@/services/FirestoreService";
import { CreatureSelected, GameMatch, PlayerGame, Position } from "../types";

type GameContextData = {
  gameMatch: GameMatch;
  isLoading: boolean;
  passTurn: () => Promise<void>;
  player: PlayerGame,
  opponent: PlayerGame,
  getCardByPosition: (position: Position) => CreatureSelected | null
  hasCardInPosition: (position: Position) => boolean
};

const defaultGameMatch: GameMatch = {
  id: '',
  createdAt: '',
  player: {
    id: '',
    name: ''
  },
  opponent: {
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

const GameContext = createContext<GameContextData>({
  isLoading: true,
  gameMatch: defaultGameMatch,
  passTurn: async () => {},
  player: {
    id: '',
    name: '',
    creaturesInHand: [],
    creaturesInBoard: []
  },
  opponent: {
    id: '',
    name: '',
    creaturesInHand: [],
    creaturesInBoard: []
  },
  getCardByPosition: () => null,
  hasCardInPosition: () => false
});

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

      const opponent = Object.values(gameData.players).find((player) => player.id !== userId);

      if (!opponent) {
        return;
      }

      const isYourTurn = gameData.turn === userId;

      const match: GameMatch = {
        id: gameData.id,
        createdAt: gameData.createdAt,
        player: {
          id: userId,
          name: gameData.players[userId].playerName
        },
        opponent: {
          id: opponent.id,
          name: opponent.playerName
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

    await firestoreService.passTurn(gameId, gameMatch.opponent.id);
  }

  const opponentId = gameMatch.opponent.id
  const opponentCreaturesInBoard = gameMatch.battlefield?.players[opponentId]?.creatures.selectedCreatures || []
  const opponentCreaturesInHand = gameMatch.battlefield?.players[opponentId]?.creatures.initialCreatures || []

  const playerCreaturesInHand = gameMatch.battlefield?.players[userId]?.creatures.initialCreatures || []
  const playerCreaturesInBoard = gameMatch.battlefield?.players[userId]?.creatures.selectedCreatures || []

  const player: PlayerGame = {
    id: userId,
    name: gameMatch.player.name,
    creaturesInHand: playerCreaturesInHand,
    creaturesInBoard: playerCreaturesInBoard
  }

  const opponent: PlayerGame = {
    id: opponentId,
    name: gameMatch.opponent.name,
    creaturesInHand: opponentCreaturesInHand,
    creaturesInBoard: opponentCreaturesInBoard
  }

  const getCardByPosition = (position: Position): CreatureSelected | null => {
    const card = playerCreaturesInBoard.find((creature) =>
      creature.position.column === position.column && creature.position.row === position.row)

    return card || null
  }

  const hasCardInPosition = (position: Position): boolean => {
    return opponentCreaturesInBoard.some((creature) =>
      creature.position.column === position.column && creature.position.row === position.row)
  }

  return (
    <GameContext.Provider value={{
      gameMatch,
      isLoading,
      passTurn,
      player,
      opponent,
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
