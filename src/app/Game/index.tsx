import { useParams } from 'react-router-dom'
import { GameContent } from './GameContent';
import { GameNotFound } from '@/components/GameNotFound';
import { sessionService } from "@/services/SessionService";

export const Game = () => {
  const { id } = useParams<{ id: string }>();
  const user = sessionService.getUser()

  if (!id || !user) {
    return <GameNotFound />
  }

  return <GameContent id={id} user={user} />
}
