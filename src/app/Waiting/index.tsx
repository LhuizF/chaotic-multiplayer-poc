import { useParams } from "react-router-dom";
import { GameNotFound } from "@/components/GameNotFound";
import { WaitingContent } from "./WaitingContent";
import { gameService } from '@/services/GameService'
import { sessionService } from '@/services/SessionService'

export const Waiting = () => {
  const { id } = useParams<{ id: string }>();

  const user = sessionService.getUser()

  if (!id || !user) {
    return <GameNotFound />
  }

  return <WaitingContent matchId={id} userId={user.id} gameService={gameService} />
}
