import { useCallback, useEffect, useState } from "react";
import { IGameService } from "@/services/GameService/IGameService";
import { sessionService } from "@/services/SessionService";
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'

interface UseJoinGameProps {
  matchId: string;
  gameService: IGameService;
}

export function useJoinGame({ matchId, gameService }: UseJoinGameProps) {
  const user = sessionService.getUser()
  const [error, setError] = useState<string>('')
  const [errorName, setErrorName] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>(user?.playerName || '')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const getGame = useCallback(async () => {
    setIsLoading(true)
    const gameData = await gameService.getMatch(matchId)

    if (!gameData) {
      setError('Partida não encontrada')
      return
    }

    if (gameData.status !== 'waiting') {
      setError('Convite inválido')
      return
    }

    const totalPlayers = Object.keys(gameData.players).length

    const inGame = Object.keys(gameData.players).includes(user?.id || '')

    if (inGame) {
      setError('Você já está na partida')
      return
    }

    if (totalPlayers !== 1) {
      setError('Partida cheia')
      return
    }
    setIsLoading(false)
  }, [matchId])

  const handleJoinGame = async () => {
    if (!playerName || playerName.length < 3) {
      setErrorName(true)
      return
    }
    setIsLoading(true)

    const playerId = user ? user.id : uuid()

    try {
      sessionService.saveUser({ id: playerId, playerName })
      const isJoin = await gameService.joinGame(matchId, {
        id: playerId,
        playerName
      })

      if (!isJoin) {
        setError('Erro ao entrar na partida')
        return
      }

      navigate(`/game/${matchId}`)
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
