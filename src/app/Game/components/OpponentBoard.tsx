import { useGame } from "../context/GameContext"
import { Position } from "../types"

export const OpponentBoard = () => {
  return (
    <div className="flex w-1/2 gap-2">
      <div className="flex flex-col w-1/2 justify-center items-center gap-2">
        <Slot position={{ column: 1, row: 1 }} />
        <Slot position={{ column: 1, row: 2 }} />
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <Slot position={{ column: 2, row: 1 }} />
      </div>
    </div>
  )
}

interface SlotProps {
  position: Position
}

const Slot = ({ position }: SlotProps) => {
  const { hasCardInPosition } = useGame()

  const hasCard = hasCardInPosition(position)

  return (
    <div className="border rounded card-slot">
      {/* Coluna: {position.column} - Linha: {position.row} */}
      {hasCard &&
        <div className="w-full h-full bg-[#392825] flex justify-center items-center">
          <div className="w-1/2 h-2/3 bg-black rounded-full"></div>
        </div>
      }
    </div>
  )
}
