import { useParams } from "react-router-dom";
import { GameNotFound } from "@/components/GameNotFound";
import { WaitingContent } from "./WaitingContent";

export const Waiting = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <GameNotFound />
  }

  return <WaitingContent gameId={id} />
}
