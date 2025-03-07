import { useParams } from 'react-router-dom'
import { GameContent } from './GameContent';
import { GameNotFound } from '@/components/GameNotFound';
import { sessionService } from "@/services/SessionService";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Game = () => {
  const { id } = useParams<{ id: string }>();
  const user = sessionService.getUser()

  if (!id || !user) {
    return <GameNotFound />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <GameContent id={id} user={user} />
    </DndProvider>
  )
}
