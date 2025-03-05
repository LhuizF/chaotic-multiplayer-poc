import { useParams } from 'react-router-dom'
import { GameContent } from './GameContent';
import { GameNotFound } from '@/components/GameNotFound';

export const Game = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <GameNotFound />
  }

  return <GameContent id={id} />
}
