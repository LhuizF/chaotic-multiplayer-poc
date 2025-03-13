import { IGameService } from '@/services/GameService/IGameService'
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { sessionService } from '@/services/SessionService';

interface UseCreateGameProps {
  gameService: IGameService
}

export function useCreateGame({ gameService }: UseCreateGameProps) {
  const user = sessionService.getUser()
  const [playerName, setPlayerName] = useState(user?.playerName || '')
  const [isLoading, setIsLoading] = useState(false)
  const [erroName, setErroName] = useState(false)

  const navigate = useNavigate()

  const createGame = async () => {
    if (!playerName || playerName.length < 3) {
      setErroName(true)
      return
    }

    if (isLoading) return

    const gameId = uuid()
    setIsLoading(true)

    const playerId = user ? user.id : uuid()

    try {
      await gameService.createGameMatch(gameId, { id: playerId, playerName })

      sessionService.saveUser({ id: playerId, playerName })
      navigate(`/waiting/${gameId}`)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      alert('Erro ao criar a partida :(')
    }
  }

  return { createGame, isLoading, erroName, setErroName, playerName, setPlayerName }
}
