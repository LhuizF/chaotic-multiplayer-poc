import { useGame } from "../context/GameContext"


export const MainGame = () => {
  const { gameMatch, passTurn } = useGame();
  return (
    <div className="flex flex-col items-center justify-center">
      <p> {gameMatch.isYourTurn ? 'Sua vez' : 'Vez do adversário'}</p>

      {gameMatch.isYourTurn && (
        <button
          className="btn btn-primary"
          onClick={passTurn}>
          Passar a vez
        </button>
      )}

    </div>
  )
}
