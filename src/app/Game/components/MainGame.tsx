import { useGame } from "../context/GameContext"
import { Board } from "./Board";
import { HandCards } from './HandCards'
import { OpponentHand } from './OpponentHand'

export const MainGame = () => {
  const { gameMatch, userId } = useGame();

  const opponentId = gameMatch.opponent.id

  const opponentCreatures = gameMatch.battlefield?.players[opponentId]?.creatures.initialCreatures || []
  const initialCreatures = gameMatch.battlefield?.players[userId]?.creatures.initialCreatures || []

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen overflow-hidden">
      <OpponentHand cards={opponentCreatures} />
      <Board />
      <HandCards cards={initialCreatures} />
    </div>
  )
}
