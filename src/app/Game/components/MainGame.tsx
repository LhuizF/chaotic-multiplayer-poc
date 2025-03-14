import { Board } from "./Board";
import { PlayerHand } from './PlayerHand'
import { OpponentHand } from './OpponentHand'
import { useGame } from "../context/GameContext";
import { DisplayPlayer } from "./DisplayPlayer";

export const MainGame = () => {
  const { player, opponent, gameMatchInfo } = useGame()

  const isYourTurn = gameMatchInfo.isYourTurn


  console.log('gameMatchInfo', gameMatchInfo.gameStatus)

  return (
    <div className="h-full flex items-center justify-evenly">
      <DisplayPlayer id={opponent.id} name={opponent.name} turn={!isYourTurn} />

      <div className="flex flex-col items-center h-full">
        <OpponentHand />
        <Board />
        <PlayerHand />
      </div>

      <DisplayPlayer id={player.id} name={player.name} turn={isYourTurn} isPlayer />
    </div>
  )
}
