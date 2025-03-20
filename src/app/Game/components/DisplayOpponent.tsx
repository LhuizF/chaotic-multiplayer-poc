import { GameStatus } from "../types";

interface DisplayOpponentProps {
  name: string;
  turn: boolean;
  gameStatus: GameStatus
}

export const DisplayOpponent = ({ name, turn, gameStatus }: DisplayOpponentProps) => {

  const isYourTurn = turn && gameStatus !== 'choosing_creatures';

  return (
    <div className={`flex flex-col h-full w-50 p-4`}>
      <div className={`flex flex-col gap-1 items-center bg-base-200 w-full p-4 border border-primary rounded
          ${isYourTurn ? 'border-red-500' : 'animate-none'}
        `}>
        <p className="text-lg font-semibold">{name}</p>
      </div>
    </div>
  )
};
