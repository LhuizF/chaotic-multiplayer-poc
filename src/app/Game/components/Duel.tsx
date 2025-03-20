import { FaRegHeart } from "react-icons/fa";
import { useGame } from "../context/GameContext";

export const Duel = () => {
  const { duel } = useGame();

  if (!duel) {
    return null
  }

  return (
    <div className='absolute top-0 left-0 bg-zinc-600 p-4 flex w-full h-full border rounded'>
      <div className='w-1/2 flex items-center justify-center'>
        <div className='bg-gray-700 w-2/3 p-4 rounded flex flex-col items-center border justify-between'>
          <img src={duel.playerCreature.image} />
          <div className="flex gap-2">
            <div className="flex items-center text-lg justify-center gap-1 text-red-600">
              <FaRegHeart />
              <p>{duel.playerCreature.health}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 flex items-center justify-center'>
        <div className='bg-gray-700 w-2/3 p-4 rounded flex flex-col items-center border justify-between'>
          <img src={duel.opponentCreature.image} />
          <div className="flex gap-2">
            <div className="flex items-center text-lg justify-center gap-1 text-red-600">
              <FaRegHeart />
              <p>{duel.opponentCreature.health}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
