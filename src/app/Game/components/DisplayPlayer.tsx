import { useFinishChoicePhase } from "../hooks/useFinishChoicePhase";
import { GameStatus } from "../types";

interface DisplayPlayerProps {
  id: string;
  name: string;
  turn: boolean;
  gameStatus: GameStatus
}

export const DisplayPlayer = ({ name, turn, gameStatus }: DisplayPlayerProps) => {
  const { finishChoicePhase, canConfirmCreatures, renderStartBattle } = useFinishChoicePhase();

  const isYourTurn = turn && gameStatus !== 'choosing_creatures';

  return (
    <div className={`flex flex-col h-full w-50 p-4 justify-end`}>
      <div className={`flex flex-col gap-1 items-center bg-base-200 w-full p-4 border border-primary rounded
          ${isYourTurn ? 'border-red-500' : 'animate-none'}
        `}>

        <p className="text-lg font-semibold">{name}</p>
        {gameStatus === 'duel' && (
          <p className="text-xs text-center font-semibold">{turn ? 'Seu turno' : 'Turno do oponente'}</p>
        )}

        {gameStatus === 'select_duel' && (
          <p className="text-xs text-center font-semibold">
            {turn ? 'Selecione uma criatura de ataque e um alvo' : 'Turno do oponente'}
          </p>
        )}

        {renderStartBattle &&
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
