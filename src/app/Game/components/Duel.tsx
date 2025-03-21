import { FaRegHeart } from "react-icons/fa";
import { useGame } from "../context/GameContext";
import { useDrop } from "react-dnd";
import { Attack } from "@/cards/attacks";
import { useEffect } from "react";
import { useAttack } from "../hooks/useAttack";

interface IDrop {
  isOver: boolean
  canDrop: boolean
}

export const Duel = () => {
  const { duel } = useGame();

  const { cardHover, setCardHover, setAttackCard } = useAttack();

  const [{ isOver }, drop] = useDrop<Attack, void, IDrop>(() => ({
    accept: 'CARD_ATTACK',
    drop: setAttackCard,
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
    <div className='absolute top-0 left-0 bg-zinc-600 p-4 flex w-full h-full border rounded'>
      <div className='w-1/2 flex items-center justify-center'>
        <div className='bg-gray-700 w-2/3 p-4 rounded flex flex-col items-center border justify-between'>
          <img src={duel?.playerCreature.image} />
          <div className="flex gap-2">
            <div className="flex items-center text-lg justify-center gap-1 text-red-600">
              <FaRegHeart />
              <p>{duel?.playerCreature.health}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 flex items-center justify-center'>
        <div ref={drop}
          className={`bg-gray-700 w-2/3 p-4 rounded flex flex-col items-center border justify-between
          ${cardHover ? 'border-red-500' : ''}`}>
          <img src={duel?.opponentCreature.image} />
          <div className="flex gap-2">
            <div className="flex items-center text-lg justify-center gap-1 text-red-600">
              <FaRegHeart />
              <p>{duel?.opponentCreature.health}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
