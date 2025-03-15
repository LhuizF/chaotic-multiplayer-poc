import { useFinishChoicePhase } from "../hooks/useFinishChoicePhase";

interface DisplayPlayerProps {
  id: string;
  name: string;
  turn: boolean;
  isPlayer?: boolean;
}

export const DisplayPlayer = ({ name, isPlayer }: DisplayPlayerProps) => {
  const { finishChoicePhase, canConfirmCreatures, renderStartBattle } = useFinishChoicePhase();

  return (
    <div className={`flex flex-col h-full w-50 p-4 ${isPlayer ? 'justify-end' : ''}`}>
      <div className="flex flex-col gap-1 items-center bg-base-200 w-full p-4 border border-primary rounded">
        <p className="text-lg font-semibold">{name}</p>
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
