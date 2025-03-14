import { useFinishChoicePhase } from "../hooks/useFinishChoicePhase";

interface DisplayPlayerProps {
  id: string;
  name: string;
  turn: boolean;
}

export const DisplayPlayer = ({ name }: DisplayPlayerProps) => {
  const { finishChoicePhase, canConfirmCreatures } = useFinishChoicePhase();

  return (
    <div className="flex flex-col gap-1 items-center bg-base-200 p-4 border border-primary rounded">
      <p className="text-lg font-semibold">{name}</p>
      {/* <p>{turn ? 'Seu Turno' : ''}</p> */}
      <button
        className={`btn ${canConfirmCreatures ? 'btn-primary' : 'btn-disabled'}`}
        onClick={finishChoicePhase}>
        Iniciar combate
      </button>
    </div>
  )
};
