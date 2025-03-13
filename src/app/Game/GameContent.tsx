import { useGameStarted } from "./hooks/useGameStarted";
import { User } from "@/services/SessionService";
import { GameNotFound } from "@/components/GameNotFound";
import { LoadingScreen } from "@/components/LoadingScreen";
import { GameContextProvider } from './context/GameContext'
import { IGameService } from "@/services/GameService/IGameService";
import { MainGame } from "./components/MainGame";

interface GameContentProps {
  matchId: string;
  user: User;
  gameService: IGameService;
}

export const GameContent = ({ matchId, user, gameService }: GameContentProps) => {
  const { isLoading, error } = useGameStarted({ matchId, userId: user.id, gameService });

  if (error) {
    return <GameNotFound text={error} />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="h-screen">
      <GameContextProvider matchId={matchId} userId={user.id} gameService={gameService} >
        <MainGame />
      </GameContextProvider>
    </main>
  );
}
