import { useFinishChoicePhase } from "../hooks/useFinishChoicePhase";
import { GameStatus } from "../types";

interface DisplayPlayerProps {
  id: string;
  name: string;
  turn: boolean;
  isPlayer?: boolean;
  gameStatus: GameStatus
}

export const DisplayPlayer = ({ name, isPlayer, turn, gameStatus }: DisplayPlayerProps) => {
  const { finishChoicePhase, canConfirmCreatures, renderStartBattle } = useFinishChoicePhase();

  const isYourTurn = turn && gameStatus === 'duel';

  return (
    <div className={`flex flex-col h-full w-50 p-4 ${isPlayer ? 'justify-end' : ''}`}>
      <div className={`flex flex-col gap-1 items-center bg-base-200 w-full p-4 border border-primary rounded
          ${isYourTurn ? 'border-red-500 animate-pulse' : 'animate-none'}
        `}>

        <p className="text-lg font-semibold">{name}</p>
        {isPlayer && gameStatus === 'duel' && (
          <p className="text-xs text-center font-semibold">{turn ? 'Seu turno' : 'Turno do oponente'}</p>
        )}

        {isPlayer && renderStartBattle &&
          <button
            className={`btn ${canConfirmCreatures ? 'btn-primary' : 'btn-disabled'}`}
            onClick={finishChoicePhase}>
            Iniciar combate
          </button>
        }
      </div>
    </div>
  )
};
