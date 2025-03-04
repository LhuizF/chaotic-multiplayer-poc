import { firestoreService } from '@/services/FirestoreService'
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { sessionService } from '@/services/SessionService';

interface UseCreateGameProps {
  playerName: string
}

export function useCreateGame({ playerName }: UseCreateGameProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [erroName, setErroName] = useState(false)

  const navigate = useNavigate()

  const createGame = async () => {
    if (!playerName || playerName.length < 3) {
      setErroName(true)
      return
    }

    if (isLoading) return

    const id = uuid()
    setIsLoading(true)

    const player = sessionService.getUser()
    const playerId = player ? player.id : uuid()

    try {
      await firestoreService.create(id, {
        createdAt: new Date().toISOString(),
        players: {
          [playerId]: {
            id: playerId,
            playerName
          }
        }
      })

      sessionService.saveUser(playerId, playerName)
      navigate(`/game/${id}`)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      alert('Erro ao criar a partida :(')
    }
  }

  return { createGame, isLoading, erroName, setErroName }
}
