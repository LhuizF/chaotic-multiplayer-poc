import { OpponentBoard } from './OpponentBoard'
import { PlayerBoard } from './PlayerBoard'

export const Board = () => {

  return (
    <div className="flex flex-1 h-full bg-base-200 w-3xl gap-1 m-1 p-1 border border-white rounded">
      <PlayerBoard />

      <OpponentBoard />
    </div>
  )
}
