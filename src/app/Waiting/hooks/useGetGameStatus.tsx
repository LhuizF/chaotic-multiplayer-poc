import { useEffect, useState } from "react";
import { firestoreService, Game } from '@/services/FirestoreService'

interface UseGetGameStatus {
  gameId: string
  userId: string
}

export function useGetGameStatus({ gameId, userId }: UseGetGameStatus) {
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [game, setGame] = useState<Game | null>(null)

  const gameStatus = game?.status || null

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true)
      setError('')

      try {
        const gameData = await firestoreService.getGame(gameId)
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
  }, [gameId, userId])

  useEffect(() => {
    if (!game) return

    const unsubscribe = firestoreService.listenGame(gameId, (updatedGame) => {
      console.log('game updated', updatedGame)
    })

    return () => unsubscribe()
  }, [gameId, game])

  return { gameStatus, isLoading, error }
}
