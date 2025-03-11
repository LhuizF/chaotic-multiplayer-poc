import { createContext, useContext, useEffect, useState } from "react";
import { FirestoreService, Game } from "@/services/FirestoreService";
import { CreatureSelected, GameMatch, PlayerBattlefield, PlayerGame, Position } from "../types";

type GameContextData = {
  gameMatch: GameMatch;
  isLoading: boolean;
  passTurn: () => Promise<void>;
  playerBattlefield: PlayerBattlefield
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
  playerBattlefield: {
    creatures: {
      initialCreatures: [],
      selectedCreatures: []
    }
  },
  player: {
    id: '',
    name: '',
    creatures: [],
    hand: []
  },
  opponent: {
    id: '',
    name: '',
    creatures: [],
    hand: []
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

  const playerBattlefield = gameMatch.battlefield.players[userId];

  const opponentId = gameMatch.opponent.id

  const opponentCreatures = gameMatch.battlefield?.players[opponentId]?.creatures.initialCreatures || []
  const initialCreatures = gameMatch.battlefield?.players[userId]?.creatures.initialCreatures || []

  const playerSelectedCreatures = gameMatch.battlefield?.players[userId]?.creatures.selectedCreatures || []
  const opponentSelectedCreatures = gameMatch.battlefield?.players[opponentId]?.creatures.selectedCreatures || []

  const player = {
    id: userId,
    name: gameMatch.player.name,
    creatures: playerSelectedCreatures,
    hand: initialCreatures
  }

  const opponent = {
    id: opponentId,
    name: gameMatch.opponent.name,
    creatures: opponentSelectedCreatures,
    hand: opponentCreatures
  }

  const getCardByPosition = (position: Position): CreatureSelected | null => {
    const card = playerSelectedCreatures.find((creature) =>
      creature.position.column === position.column && creature.position.row === position.row)

    return card || null
  }

  const hasCardInPosition = (position: Position): boolean => {
    return opponentSelectedCreatures.some((creature) =>
      creature.position.column === position.column && creature.position.row === position.row)
  }

  return (
    <GameContext.Provider value={{
      gameMatch,
      isLoading,
      passTurn,
      playerBattlefield,
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
