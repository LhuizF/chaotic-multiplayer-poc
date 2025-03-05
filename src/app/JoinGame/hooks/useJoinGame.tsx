import { useCallback, useEffect, useState } from "react";
import { firestoreService } from "@/services/FirestoreService";
import { sessionService } from "@/services/SessionService";
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'

export function useJoinGame(gameId: string) {
  const [error, setError] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const getGame = useCallback(async () => {
    setIsLoading(true)
    const gameData = await firestoreService.getGame(gameId)
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
  }, [gameId])

  const handleJoinGame = async () => {
    if (!playerName || playerName.length < 3) {
      setErrorName(true)
      return
    }
    setIsLoading(true)


    const player = sessionService.getUser()
    const playerId = player ? player.id : uuid()

    try {
      sessionService.saveUser({ id: playerId, playerName })
      const isJoin = await firestoreService.joinGame(gameId, {
        id: playerId,
        playerName
      })

      if (!isJoin) {
        setError(true)
        return
      }
      navigate(`/game/${gameId}`)
    } catch (error) {
      console.error(error)
      alert('Erro ao entrar na partida :(')
    } finally {
      setIsLoading(false)
    }
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
