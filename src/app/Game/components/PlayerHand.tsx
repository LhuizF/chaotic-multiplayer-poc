import { CreatureCard } from './CreatureCard';
import { useGame } from "../context/GameContext";
import { AttackCard } from './AttackCard';

export const PlayerHand = () => {
  const { player, gameMatchInfo, duel } = useGame()


  if (gameMatchInfo.gameStatus === 'duel' && duel) {
    return (
      <div className="flex justify-center gap-2 h-48 w-full max-w-3xl">
        {player.handAttacks.map((attack) =>
          <AttackCard key={attack.id} attack={attack} isPlayerTurn={duel.playerTurn} />
        )}
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-2 h-48 w-full max-w-3xl">
      {player.handCreatures.map((creature) =>
        <CreatureCard key={creature.id} creature={creature} />
      )}
    </div>
  )
}
