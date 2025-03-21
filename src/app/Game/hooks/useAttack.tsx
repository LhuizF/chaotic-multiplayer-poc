import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Attack } from "@/cards/attacks";
import { useGame } from "../context/GameContext";
import { CreatureSelected } from "../types";

import { UpdatePlayerDuel } from '@/services/GameService/dtos/UpdatePlayerDuel.dto'

export const useAttack = () => {
  const [cardHover, setCardHover] = useState<Attack | null>(null)
  const [attackCard, setAttackCard] = useState<Attack | null>(null)
  const { duel, player, opponent, gameMatchInfo, gameService } = useGame();

  const attackCreature = async (attack: Attack, creatureTarget: CreatureSelected) => {
    console.log(duel?.rounds)
    if (!creatureTarget) {
      toast.error('Selecione um alvo para atacar')
      return
    }
    const newHealth = creatureTarget.health - attack.damage

    console.log('newHealth', newHealth)

    if (newHealth <= 0) {
      toast.success('Criatura derrotada')
      // vai encerrar o duelo
      return
    }
    const newOpponentCreature = { ...creatureTarget, health: newHealth }

    const playerHandAttacks = player.handAttacks.filter(handAttack => handAttack.id !== attack.id)
    const nextAttack = player.deck[0]

    if (nextAttack) {
      playerHandAttacks.push(nextAttack)
    }

    player.deck.shift()

    player.handAttacks = playerHandAttacks

    if (!duel) {
      console.log('Duelo não encontrado')
      return
    }

    const updatePlayerDuel: UpdatePlayerDuel = {
      playerId: player.id,
      player: player,
      duelRound: {
        roundNumber: duel.rounds.length + 1,
        playerId: player.id,
        attack,
        damage: attack.damage
      },
      opponent: {
        id: opponent.id,
        creature: newOpponentCreature
      }
    }

    try {
      await gameService.updatePlayerDuel(gameMatchInfo.id, updatePlayerDuel)
      console.log('Duelo atualizado')
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    if (attackCard && duel) {
      attackCreature(attackCard, duel.opponentCreature)
      setAttackCard(null)
    }
  }, [attackCard])

  return { setCardHover, cardHover, setAttackCard };
}
