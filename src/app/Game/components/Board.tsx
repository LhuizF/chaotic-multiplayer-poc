import { OpponentBoard } from './OpponentBoard'
import { PlayerBoard } from './PlayerBoard'

export const Board = () => {
  return (
    <div className=" flex flex-col bg-base-200 flex-1 w-3xl gap-1 m-1 p-1 border border-white rounded">
      <OpponentBoard />

      <hr />

      <PlayerBoard />
    </div>
  )
}
