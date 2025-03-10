import { CreatureCard } from './CreatureCard';
import { useGame } from "../context/GameContext";


export const PlayerHand = () => {
  const { player } = useGame()

  return (
    <div className="flex justify-center gap-2 h-40 w-full max-w-3xl">
      {player.hand.map((creature) =>
        <CreatureCard key={creature.id} creature={creature} />
      )}
    </div>
  )
}
