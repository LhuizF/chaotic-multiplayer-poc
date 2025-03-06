import { useGameStarted } from "./hooks/useGameStarted";
import { User } from "@/services/SessionService";
import { GameNotFound } from "@/components/GameNotFound";
import { LoadingScreen } from "@/components/LoadingScreen";
import { GameContextProvider } from './context/GameContext'
import { firestoreService } from "@/services/FirestoreService";
import { MainGame } from "./components/MainGame";

interface GameContentProps {
  id: string;
  user: User
}

export const GameContent = ({ id, user }: GameContentProps) => {
  const { isLoading, error } = useGameStarted({ gameId: id, userId: user.id });

  if (error) {
    return <GameNotFound text={error} />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <GameContextProvider gameId={id} userId={user.id} firestoreService={firestoreService}>
        <MainGame />
      </GameContextProvider>
    </main>
  );
}
