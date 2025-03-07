import { Creature } from "../types";
import { CreatureCard } from './CreatureCard';
interface HandCardProps {
  cards: Creature[];
}

export const HandCards = ({ cards }: HandCardProps) => {

  return (
    <div className="flex gap-2">
      {cards.map((creature) =>
        <CreatureCard key={creature.id} creature={creature} />
      )}
    </div>
  )
}
