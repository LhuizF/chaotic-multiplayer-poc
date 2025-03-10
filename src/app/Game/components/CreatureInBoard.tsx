import { TbSword } from "react-icons/tb"
import { Creature } from "../../../cards/creatures"
import { CreatureSelected } from "../types"
import { FaRegHeart } from "react-icons/fa"

interface CreatureInBoardProps {
  creature: Creature | CreatureSelected
}

export const CreatureInBoard = ({ creature }: CreatureInBoardProps) => {

  return (
    <div className="flex flex-col items-center justify-between bg-zinc-900 h-full p-1">
      <p>{creature.name}</p>
      <div className="flex items-center justify-center w-30 h-30">
        <img
          className="object-contain"
          src={creature.image}
          alt={creature.name}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex items-center justify-center gap-1">
          <TbSword />
          <p>{creature.power}</p>
        </div>
        <div className="flex items-center justify-center gap-1 text-red-600">
          <FaRegHeart />
          <p>{creature.health}</p>
        </div>
      </div>
    </div>
  )
}
