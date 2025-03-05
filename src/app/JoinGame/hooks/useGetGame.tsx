import { useCallback, useEffect, useState } from "react";
import { firestoreService } from "@/services/FirestoreService";

export function useGetGame(id: string) {
  const [error, setError] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getGame = useCallback(async () => {
    setIsLoading(true)
    const gameData = await firestoreService.getGame(id)
    if (!gameData) {
      setError(true)
      return
    }

    if (gameData.status !== 'waiting') {
      setError(true)
      return
    }

    const totalPlayers = Object.keys(gameData.players).length

    if (totalPlayers !== 1) {
      setError(true)
      return
    }
    setIsLoading(false)
  }, [id])

  const handleJoinGame = () => {
    if (!playerName || playerName.length < 3) {
      setErrorName(true)
      return
    }
    setIsLoading(true)

    console.log('Entrou no jogo')
    setIsLoading(false)
  }

  useEffect(() => {
    getGame()
  }, [getGame])


  const cleanErrorName = () => {
    setErrorName(false)
  }

  return {
    error,
    playerName,
    setPlayerName,
    handleJoinGame,
    errorName,
    cleanErrorName,
    isLoading
  }
}
