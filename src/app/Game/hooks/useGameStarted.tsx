import { useEffect, useState } from "react";
import { firestoreService } from "@/services/FirestoreService";

interface UseGameListenerProps {
  gameId: string;
  userId: string;
}

export function useGameStarted({ gameId, userId }: UseGameListenerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGame = async () => {
      setIsLoading(true);

      if (!gameId) {
        return;
      }

      try {
        const gameData = await firestoreService.getGame(gameId);

        if (!gameData) {
          setError('Partida não encontrada');
          return;
        }

        if (!gameData.players?.[userId]) {
          setError('Você não está na partida');
          return;
        }

        if (gameData.status !== 'playing') {
          setError('Partida não iniciada');
          return;
        }
      } catch (error) {
        console.error(error);
        setError('');
      } finally {
        setIsLoading(false);
      }
    };

    getGame();
  }, [])

  return { isLoading, error };
}
