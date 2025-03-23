import { useParams } from "react-router-dom"
import { useGetPlayerWinner } from "./hooks/getPlayerWinner";
import { gameService } from '@/services/GameService'
import { ResultContent } from "./ResultContent";
import { LoadingScreen } from "@/components/LoadingScreen";

export const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, playerWinner } = useGetPlayerWinner({ id, gameService })

  if (loading) {
    return <LoadingScreen />
  }

  return <ResultContent name={playerWinner.playerName} />
}
