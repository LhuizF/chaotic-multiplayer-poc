import { Creature } from "../types";

interface HandCardProps {
  cards: Creature[];
}

export const HandCards = ({ cards }: HandCardProps) => {

  return (
    <div className="flex gap-2">
      {cards.map((creature) => (
        <div
          key={creature.id}
          className="flex flex-col items-center justify-between p-2 rounded border bg-gray-700 border-red-500 hover:scale-105">
          <p>{creature.name}</p>
          <div className="w-24 h-24 border border-gray-200 rounded">
            <img src={creature.image} alt={creature.name} className="object-cover" />
          </div>
          <div>
            <p>Vida: {creature.health}</p>
            <p>Poder: {creature.power}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
