import { useCallback, useEffect, useState } from "react";
import { firestoreService } from "@/services/FirestoreService";
import { sessionService } from "@/services/SessionService";
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'

interface UseJoinGameProps {
  gameId: string;
}

export function useJoinGame({ gameId }: UseJoinGameProps) {
  const [error, setError] = useState<string>('')
  const [errorName, setErrorName] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const getGame = useCallback(async () => {
    setIsLoading(true)
    const gameData = await firestoreService.getGame(gameId)

    if (!gameData) {
      setError('Partida não encontrada')
      return
    }

    if (gameData.status !== 'waiting') {
      setError('Convite inválido')
      return
    }

    const userId = sessionService.getUser()?.id

    const totalPlayers = Object.keys(gameData.players).length

    const inGame = Object.keys(gameData.players).includes(userId || '')

    if (inGame) {
      setError('Você já está na partida')
      return
    }

    if (totalPlayers !== 1) {
      setError('Partida cheia')
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
        setError('Erro ao entrar na partida')
        return
      }

      navigate(`/game/${gameId}`)
    } catch (error) {
      console.error(error)
      setError('Erro ao entrar na partida')
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
