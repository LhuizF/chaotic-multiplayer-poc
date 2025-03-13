import { Position } from "../types";
import { useEffect, useState } from "react";
import { gameService } from '@/services/GameService'
import { Creature } from "@/cards/creatures";
import { useGame } from "../context/GameContext";

interface UseSetCreaturePositionProps {
  position: Position
}

export const useSetCreaturePosition = ({ position }: UseSetCreaturePositionProps) => {
  const [cardHover, setCardHover] = useState<Creature | null>(null)
  const [cardSelected, setCardSelected] = useState<Creature | null>(null)

  const { player, gameMatchInfo } = useGame()

  const setCreaturePosition = async (creatureId: string, position: Position) => {
    const creatureInitial = player.handCards.find((creature) => creature.id === creatureId);

    if (!creatureInitial) {
      console.log(`Criatura com id ${creatureId} não encontrada na mão do jogador`);
      return;
    }

    const creaturesInBoard = player.boardCreatures.find((creature) => creature.id === creatureId);

    if (creaturesInBoard) {
      console.log(`Criatura com id ${creatureId} já foi jogada`);
      return;
    }

    const haveCardInPosition = player.boardCreatures.find((creature) => {
      return creature.position.row === position.row && creature.position.column === position.column;
    })

    if (haveCardInPosition) {
      console.log('Já existe uma criatura nessa posição');
      return;
    }

    player.boardCreatures.push({ ...creatureInitial, position });
    const newPlayerHand = player.handCards.filter((creature) => creature.id !== creatureId);

    const playerGame = {
      playerId: player.id,
      handCards: newPlayerHand,
      boardCreatures: player.boardCreatures
    }

    try {
      await gameService.updatePlayerGame(gameMatchInfo.id, playerGame);

      setCardSelected(null);
    } catch (error) {
      console.log('Erro ao atualizar criatura no firebase', error);
    }
  };

  useEffect(() => {
    if (cardSelected) {
      setCreaturePosition(cardSelected.id, position)
    }
  }, [cardSelected])

  return { setCreaturePosition, setCardHover, setCardSelected, cardHover };
}
