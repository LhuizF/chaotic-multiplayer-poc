import { useGameListener } from "./hooks/useGameListener";
import { sessionService } from "@/services/SessionService";
import { GameNotFound } from "@/components/GameNotFound";
import { LoadingScreen } from "@/components/LoadingScreen";

interface GameContentProps {
  id: string;
}
export const GameContent = ({ id }: GameContentProps) => {
  const user = sessionService.getUser();
  const { gameMatch, isLoading, error } = useGameListener({ gameId: id, userId: user?.id || '' });

  if (error) {
    return <GameNotFound text={error} />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main>
      <h1>Game {id}</h1>
      {gameMatch && (
        <div>
          <p>Adversary: {gameMatch.adversary.name}</p>
          <p>Your turn: {gameMatch.isYourTurn ? 'Yes' : 'No'}</p>
        </div>
      )}
    </main>
  );
}
