import { OpponentBoard } from './OpponentBoard'
import { PlayerBoard } from './PlayerBoard'
import { Duel } from './Duel'

export const Board = () => {

  return (
    <div className="flex flex-1 items-center">
      <div className="flex border border-white p-4 rounded h-fit w-full gap-2 relative">
        <PlayerBoard />
        <OpponentBoard />

        <Duel />
      </div>
    </div>
  )
}
