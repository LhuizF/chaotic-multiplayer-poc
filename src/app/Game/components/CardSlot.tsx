import { useEffect } from "react"
import { CreatureInBoard } from "./CreatureInBoard"
import { useDrop } from "react-dnd"
import { Creature } from "../../../cards/creatures"
import { useSetCreaturePosition } from "../hooks/useSetCreaturePosition"
import { useGame } from "../context/GameContext"
import { Position } from "../types"

interface IUseDrop {
  isOver: boolean
  canDrop: boolean
}

interface CardSlotProps {
  position: Position
}

export const CardSlot = ({ position }: CardSlotProps) => {
  const { getCardByPosition } = useGame()

  const card = getCardByPosition(position)

  const { setCardHover, setCardSelected, cardHover } = useSetCreaturePosition({ position })

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
      className="border rounded relative card-slot overflow-hidden"
      style={{ backgroundColor: canDrop && !card ? '#4D4D4DFF' : 'transparent' }}
    >
      {cardHover && !card && (
        <CreatureInBoard creature={cardHover} />
      )}

      {card && (
        <CreatureInBoard creature={card} inGame />
      )}

      <p className="absolute bottom-0 right-0 text-xs text-gray-400">
        coluna: {position.column} <br />
        linha: {position.row}
      </p>
    </div>
  )
}
