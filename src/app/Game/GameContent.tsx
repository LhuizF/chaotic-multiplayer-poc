interface GameContentProps {
  id: string;
}

export const GameContent = ({ id }: GameContentProps) => {
  return (
    <div>
      <h1>Game {id}</h1>
      <p>
        Link para convite:
        <br />
        <span>
          http://localhost:3000/join/{id}
        </span>
      </p>
    </div>
  );
}
