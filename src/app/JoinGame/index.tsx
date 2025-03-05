import { useParams } from 'react-router-dom';
import { JoinGameContent } from './JoinGameContent'
import { GameNotFound } from '@/components/GameNotFound'

export const JoinGame = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <GameNotFound />
  }

  return <JoinGameContent id={id} />
}
