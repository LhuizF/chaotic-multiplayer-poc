import { createContext, useContext, useEffect, useState } from "react";
import { IGameService } from "@/services/GameService/IGameService";
import { GameMatchInfo, PlayerInGame, Position, CreatureSelected, Duel } from "../types";
import { GameMatch } from "../../../services/GameService/types";

type GameContextData = {
  gameMatchInfo: GameMatchInfo;
  isLoading: boolean;
  player: PlayerInGame,
  opponent: PlayerInGame,
  gameService: IGameService;
  getPlayerCardByPosition: (position: Position) => CreatureSelected | null
  getOpponentCardByPosition: (position: Position) => CreatureSelected | null
  duel: Duel | null
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
  getPlayerCardByPosition: () => null,
  getOpponentCardByPosition: () => null,
  gameService: {} as IGameService,
  duel: null
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
  const [duel, setDuel] = useState<Duel | null>(null);

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

      if (gameData.game.status === 'duel') {
        const duel = {
          playerCreature: gameData.game.duels[0][userId].creature,
          opponentCreature: gameData.game.duels[0][opponent.id].creature
        }

        setDuel(duel);
      }

      setGameMatch(match);
      setIsLoading(false);
    });

    return () => unsubscribe()

  }, [matchId, userId]);

  const player = gameMatch.player;
  const opponent = gameMatch.opponent;

  const getCardAtPosition = (creatures: CreatureSelected[], position: Position): CreatureSelected | null =>
    creatures.find(({ position: { column, row } }) => column === position.column && row === position.row) || null;

  const getPlayerCardByPosition = (position: Position) => getCardAtPosition(player.boardCreatures, position);
  const getOpponentCardByPosition = (position: Position) => getCardAtPosition(opponent.boardCreatures, position);

  return (
    <GameContext.Provider value={{
      gameMatchInfo: gameMatch,
      isLoading,
      player,
      opponent,
      gameService,
      getPlayerCardByPosition,
      getOpponentCardByPosition,
      duel
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
