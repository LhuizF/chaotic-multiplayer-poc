import { realtimeService } from '@/services/RealtimeService'
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

interface UseCreateGameProps {
  playerName: string
}

export function useCreateGame({ playerName }: UseCreateGameProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [erroName, setErroName] = useState(false)

  const createGame = async () => {
    if (!playerName || playerName.length < 3) {
      setErroName(true)
      return
    }

    if (isLoading) return

    const id = uuid()
    setIsLoading(true)

    const playerId = uuid()

    try {
      realtimeService.create(id, {
        createdAt: new Date().toISOString(),
        players: {
          [playerId]: {
            id: playerId,
            playerName
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { createGame, isLoading, erroName, setErroName }
}
