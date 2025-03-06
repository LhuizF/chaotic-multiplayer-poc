import { useEffect, useState } from "react";
import { GameMatch } from "../types";
import { firestoreService, Game } from "@/services/FirestoreService";

interface UseGameListenerProps {
  gameId: string;
  userId: string;
}

export function useGameListener({ gameId, userId }: UseGameListenerProps) {
  const [gameMatch, setGameMatch] = useState<GameMatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGame = async () => {
      if (!gameId) {
        return;
      }

      const gameData = await firestoreService.getGame(gameId);

      if (!gameData || gameData.status !== 'playing' || !gameData.players?.[userId]) {
        return;
      }

      setInGame(true);
    };

    getGame();
  }, [])

  useEffect(() => {
    if (!inGame) {
      setError('Você não está nessa partida');
      setIsLoading(false);
      return;
    }

    console.log('listening game', gameId);
    const unsubscribe = firestoreService.listenGame(gameId, (gameData: Game) => {
      if (!gameData) {
        setGameMatch(null);
        return;
      }

      if (gameData.status !== 'playing') {
        setGameMatch(null);
        return;
      }

      const adversary = Object.values(gameData.players).find((player) => player.id !== userId);

      if (!adversary) {
        setGameMatch(null);
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
        isYourTurn
      }

      setGameMatch(match);
      setIsLoading(false);
    });

    return () => unsubscribe()

  }, [gameId, userId, inGame]);


  return { gameMatch, isLoading, error };
}
