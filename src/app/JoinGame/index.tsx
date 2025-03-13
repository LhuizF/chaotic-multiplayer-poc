import { useParams } from 'react-router-dom';
import { JoinGameContent } from './JoinGameContent'
import { GameNotFound } from '@/components/GameNotFound'
import { gameService } from '@/services/GameService'

export const JoinGame = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <GameNotFound />
  }

  return <JoinGameContent matchId={id} gameService={gameService} />
}
