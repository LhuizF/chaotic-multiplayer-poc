import { useEffect } from "react"
import { useDrop } from "react-dnd"
import { Position } from "../types"
import { useSetCreaturePosition } from "../hooks/useSetCreaturePosition"
import { Creature } from "@/cards/creatures"
import { useGame } from "../context/GameContext"

export const PlayerBoard = () => {

  return (
    <div className="flex flex-col flex-1 gap-1">
      <div className="flex flex-1 justify-center gap-1">
        <CardSlot position={{ row: 1, column: 1 }} />
        <CardSlot position={{ row: 1, column: 2 }} />
      </div>
      <div className="flex flex-1 justify-center gap-1">
        <CardSlot position={{ row: 2, column: 1 }} />
      </div>
    </div>
  )
}

interface IUseDrop {
  isOver: boolean
  canDrop: boolean
}

interface CardSlotProps {
  position: Position
}

const CardSlot = ({ position }: CardSlotProps) => {
  const { gameMatch, playerBattlefield, userId } = useGame()
  const { setCardHover, setCardSelected, cardHover } = useSetCreaturePosition({
    gameMatchId: gameMatch.id,
    playerBattlefield,
    userId,
    position
  })

  const [{ canDrop, isOver }, drop] = useDrop<Creature, void, IUseDrop>(() => ({
    accept: 'CARD',
    drop: (item) => {
      setCardSelected(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover: (item) => {
      setCardHover(item)
    }
  }))

  useEffect(() => {
    if (!isOver) {
      setCardHover(null)
    }
  }, [isOver])

  return (
    <div
      ref={drop}
      className="border rounded relative w-28 h-28 overflow-hidden"
      style={{ backgroundColor: canDrop ? '#18181b' : 'transparent' }}
    >
      {cardHover && (
        <div className="flex items-center justify-center">
          <img
            className="object-contain"
            src={cardHover?.image}
            alt={cardHover.name}
          />
        </div>
      )}

      <p className="absolute bottom-0 right-0 text-xs text-gray-400">
        {position.row} - {position.column}
      </p>
    </div>
  )
}

