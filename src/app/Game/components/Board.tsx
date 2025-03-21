import { OpponentBoard } from './OpponentBoard'
import { PlayerBoard } from './PlayerBoard'
import { Duel } from './Duel'
import { useGame } from '../context/GameContext'

export const Board = () => {
  const { duel } = useGame()

  return (
    <div className="flex flex-1 items-center">
      <div className="flex border border-white p-4 rounded h-fit w-full gap-2 relative">
        <PlayerBoard />
        <OpponentBoard />

        {!!duel && <Duel />}
      </div>
    </div>
  )
}
