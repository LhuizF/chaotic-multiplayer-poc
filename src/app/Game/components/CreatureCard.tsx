import { useDrag } from "react-dnd"
import { Creature } from "@/cards/creatures"
import { TbSword } from "react-icons/tb"
import { FaRegHeart } from "react-icons/fa"

interface CreatureCardProps {
  creature: Creature
}

export const CreatureCard = ({ creature }: CreatureCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: creature
  }))

  const visibility = isDragging ? 'hidden' : 'visible'

  return (
    <div
      key={creature.id}
      ref={drag}
      style={{ visibility }}
      className="flex flex-col  items-center justify-between p-2 rounded border bg-gray-700 border-red-500 hover:scale-105"
    >
      <p className="text-sm font-semibold">{creature.name}</p>
      <div className="flex items-center justify-center w-30 h-30 border border-gray-200 rounded">
        <img
          src={creature.image}
          alt={creature.name}
          className="object-cover max-h-full max-w-full"
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
