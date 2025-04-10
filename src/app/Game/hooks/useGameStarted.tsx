import { useEffect, useState } from "react";
import { IGameService } from "@/services/GameService/IGameService";
import { useNavigate } from 'react-router-dom'

interface UseGameListenerProps {
  matchId: string;
  userId: string;
  gameService: IGameService;
}

export function useGameStarted({ matchId, userId, gameService }: UseGameListenerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const getGame = async () => {
      setIsLoading(true);

      if (!matchId) {
        return;
      }

      try {
        const gameData = await gameService.getMatch(matchId);

        if (!gameData) {
          setError('Partida não encontrada');
          return;
        }

        if (gameData.status === 'finished') {
          navigate(`/result/${gameData.id}`)
          return
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
