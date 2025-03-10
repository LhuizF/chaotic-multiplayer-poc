import { Board } from "./Board";
import { PlayerHand } from './PlayerHand'
import { OpponentHand } from './OpponentHand'

export const MainGame = () => {

  return (
    <div className="flex flex-col items-center h-full">
      <OpponentHand />
      <Board />
      <PlayerHand />
    </div>
  )
}
