import { Creature } from "@/cards/creatures";
import { CreatureCard } from './CreatureCard';

interface HandCardProps {
  cards: Creature[];
}

export const PlayerHand = ({ cards }: HandCardProps) => {
  return (
    <div className="flex justify-center gap-2 bg-red-300 h-40 w-full max-w-3xl">
      {cards.map((creature) =>
        <CreatureCard key={creature.id} creature={creature} />
      )}
    </div>
  )
}
