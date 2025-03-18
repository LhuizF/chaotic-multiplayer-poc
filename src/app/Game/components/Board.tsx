import { TbSword } from 'react-icons/tb'
import { useGame } from '../context/GameContext'
import { OpponentBoard } from './OpponentBoard'
import { PlayerBoard } from './PlayerBoard'
import { FaRegHeart } from 'react-icons/fa'

export const Board = () => {
  const { duel, gameMatchInfo } = useGame()

  console.log(gameMatchInfo)

  return (
    <div className="flex flex-1 items-center relative">
      <div className="flex border border-white p-4 rounded h-fit w-full gap-2">
        <PlayerBoard />
        {duel && (
          <div className='absolute top-0 left-0 bg-zinc-600 p-4 flex w-full h-full border rounded'>
            <div className='w-1/2 flex items-center justify-center'>
              <div className='bg-gray-700 w-2/3 p-4 rounded flex flex-col items-center border justify-between'>
                <img src={duel.playerCreature.image} />
                <div className="flex gap-2">
                  <div className="flex items-center justify-center gap-1">
                    <TbSword />
                    <p>{duel.playerCreature.power}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-red-600">
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
                  <div className="flex items-center justify-center gap-1">
                    <TbSword />
                    <p>{duel.opponentCreature.power}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-red-600">
                    <FaRegHeart />
                    <p>{duel.opponentCreature.health}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <OpponentBoard />
      </div>
    </div>
  )
}
