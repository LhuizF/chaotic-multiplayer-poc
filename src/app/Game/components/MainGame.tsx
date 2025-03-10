import { useGame } from "../context/GameContext"
import { Board } from "./Board";
import { PlayerHand } from './PlayerHand'
import { OpponentHand } from './OpponentHand'

export const MainGame = () => {
  const { gameMatch, userId } = useGame();

  const opponentId = gameMatch.opponent.id

  const opponentCreatures = gameMatch.battlefield?.players[opponentId]?.creatures.initialCreatures || []
  const initialCreatures = gameMatch.battlefield?.players[userId]?.creatures.initialCreatures || []

  return (
    <div className="flex flex-col items-center">
      <OpponentHand cards={opponentCreatures} />
      <Board />
      <PlayerHand cards={initialCreatures} />
    </div>
  )
}
