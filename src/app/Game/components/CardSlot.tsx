import { useEffect } from "react"
import { CreatureInBoard } from "./CreatureInBoard"
import { useDrop } from "react-dnd"
import { Creature } from "../../../cards/creatures"
import { useSetCreaturePosition } from "../hooks/useSetCreaturePosition"
import { useGame } from "../context/GameContext"
import { Position } from "../types"
import { useDuel } from "../context/DuelContext"

interface IUseDrop {
  isOver: boolean
  canDrop: boolean
}

interface CardSlotProps {
  position: Position
}

export const CardSlot = ({ position }: CardSlotProps) => {
  const { getPlayerCardByPosition, player, gameMatchInfo } = useGame()

  const card = getPlayerCardByPosition(position)

  const { setCardHover, setCardSelected, cardHover } = useSetCreaturePosition({ position })

  const { selectPlayerCard, playerCard } = useDuel()

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

  const battleStarted = gameMatchInfo.gameStatus === 'battle'

  const cardSelected = playerCard && card && playerCard.id === card.id

  return (
    <div
      ref={drop}
      className={`border rounded relative card-slot overflow-hidden
        ${battleStarted && !playerCard ? 'hover:border-blue-500' : ''}
        ${cardSelected ? 'border-red-500 hover:border-red-500' : ''}
        `}
      style={{ backgroundColor: canDrop && !card ? '#4D4D4DFF' : 'transparent' }}
      onClick={() => {
        if (battleStarted && card) {
          console.log('selectPlayerCard', card)
          selectPlayerCard(card)
        }
      }}
    >
      {cardHover && !card && (
        <CreatureInBoard creature={cardHover} />
      )}

      {card && (
        <CreatureInBoard
          cardInBoard
          creature={card}
          choicePhase={player.status === 'choosing_creatures'}
        />
      )}

      <p className="absolute bottom-0 right-0 text-xs text-gray-400">
        coluna: {position.column} <br />
        linha: {position.row}
      </p>
    </div>
  )
}
