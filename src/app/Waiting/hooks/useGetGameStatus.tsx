import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGameService } from "@/services/GameService/IGameService";
import { GameMatch } from "@/services/GameService/types";

interface UseGetGameStatusProps {
  matchId: string
  userId: string
  gameService: IGameService
}

export function useGetGameStatus({ matchId, userId, gameService }: UseGetGameStatusProps) {
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [game, setGame] = useState<GameMatch | null>(null)

  const navigate = useNavigate()

  const gameStatus = game?.status || null

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true)
      setError('')

      try {
        const gameData = await gameService.getMatch(matchId)

        if (!gameData) {
          setError('Game não encontrado')
          return
        }

        if (!gameData.players?.[userId]) {
          setError('Você não está participando desta partida')
          return
        }

        setGame(gameData)
      } catch (err: any) {
        console.error(err)
        setError('Erro ao buscar informações da partida')
      }

      setIsLoading(false)
    }

    fetchGame()
  }, [matchId, userId])

  useEffect(() => {
    if (!game) return

    const unsubscribe = gameService.listenGame(matchId, (updatedGame) => {
      if (updatedGame && updatedGame.status === 'playing') {
        navigate(`/game/${matchId}`)
      }
    })

    return () => unsubscribe()
  }, [matchId, game])

  return { gameStatus, isLoading, error }
}
