interface DisplayPlayerProps {
  id: string;
  name: string;
  turn: boolean;
}

export const DisplayPlayer = ({ name, turn }: DisplayPlayerProps) => {

  return (
    <div className="flex flex-col gap-1 items-center bg-base-200 p-4 border border-primary rounded">
      <p className="text-lg font-semibold">{name}</p>
      {/* <p>{turn ? 'Seu Turno' : ''}</p> */}

      <button className="btn btn-primary mt-2">Finalizar Turno</button>
    </div>
  )
};
