import { useDuel } from "../context/DuelContext"
import { useGame } from "../context/GameContext"
import { Position } from "../types"
import { CreatureInBoard } from "./CreatureInBoard"

export const OpponentBoard = () => {
  return (
    <div className="flex w-1/2 gap-2">
      <div className="flex flex-col w-1/2 justify-center items-center gap-2">
        <OpponentSlot position={{ column: 1, row: 1 }} />
        <OpponentSlot position={{ column: 1, row: 2 }} />
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <OpponentSlot position={{ column: 2, row: 1 }} />
      </div>
    </div>
  )
}

interface SlotProps {
  position: Position
}

const OpponentSlot = ({ position }: SlotProps) => {
  const { getOpponentCardByPosition, gameMatchInfo } = useGame()
  const { playerCard, opponentCard, selectOpponentCard } = useDuel()

  const card = getOpponentCardByPosition(position)

  const { gameStatus } = gameMatchInfo

  const cardSelected = opponentCard && card && opponentCard.id === card.id
  const gameStared = card && (gameStatus === 'duel' || gameStatus === 'select_duel')

  return (
    <div className={`border rounded card-slot overflow-hidden
      ${playerCard ? 'hover:border-blue-500' : ''}
      ${cardSelected ? 'border-red-500 hover:border-red-500' : ''}`}
    >
      {card && gameStatus === 'choosing_creatures' &&
        <div className="w-full h-full bg-[#392825] flex justify-center items-center">
          <div className="w-1/2 h-2/3 bg-black rounded-full"></div>
        </div>
      }
      {gameStared &&
        <div onClick={() => selectOpponentCard(card)} >
          <CreatureInBoard creature={card} />
        </div>
      }
    </div>
  )
}
