import { useDrag } from "react-dnd"
import { Creature } from "../types"

interface CreatureCardProps {
  creature: Creature
}

export const CreatureCard = ({ creature }: CreatureCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const visibility = isDragging ? 'hidden' : 'visible'

  return (
    <div
      ref={drag}
      style={{ visibility }}
      key={creature.id}
      className="flex flex-col items-center justify-between p-2 rounded border bg-gray-700 border-red-500 hover:scale-105">
      <p>{creature.name}</p>
      <div className="w-24 h-24 border border-gray-200 rounded">
        <img
          src={creature.image}
          alt={creature.name}
          className="object-cover"
        // onMouseDown={(e) => e.stopPropagation()}
        />
      </div>
      <div>
        <p>Vida: {creature.health}</p>
        <p>Poder: {creature.power}</p>
      </div>
    </div>
  )
}
