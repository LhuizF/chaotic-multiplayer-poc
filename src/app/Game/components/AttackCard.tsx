import { useDrag } from "react-dnd"
import { Attack } from "@/cards/attacks"
import { TbSword } from "react-icons/tb"

interface CreatureCardProps {
  attack: Attack
}

export const AttackCard = ({ attack }: CreatureCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD_ATTACK',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: attack
  }))

  const visibility = isDragging ? 'hidden' : 'visible'

  return (
    <div
      key={attack.id}
      ref={drag}
      style={{ visibility }}
      className="flex flex-col items-center justify-between p-2 rounded border bg-gray-700 hover:border-red-500"
    >
      <p className="text-sm font-semibold">{attack.name}</p>
      <div className="flex items-center justify-center w-30 h-30 border border-gray-200 rounded">
        <img
          src={attack.image}
          alt={attack.name}
          className="object-cover max-h-full max-w-full"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex items-center justify-center gap-1">
          <TbSword />
          <p>{attack.damage}</p>
        </div>
      </div>
    </div>
  )
}
