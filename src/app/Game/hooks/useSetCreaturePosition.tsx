import { Position } from "../types";
import { useEffect, useState } from "react";
import { firestoreService } from '@/services/FirestoreService'
import { Creature } from "@/cards/creatures";
import { useGame } from "../context/GameContext";

interface UseSetCreaturePositionProps {
  position: Position
}

export const useSetCreaturePosition = ({ position }: UseSetCreaturePositionProps) => {
  const [cardHover, setCardHover] = useState<Creature | null>(null)
  const [cardSelected, setCardSelected] = useState<Creature | null>(null)

  const { player, gameMatch, } = useGame()

  const setCreaturePosition = async (creatureId: string, position: Position) => {
    const creaturesInHand = player.creaturesInHand;

    if (!creaturesInHand) {
      console.log('playerCreatures não encontrado');
      return;
    }

    const creatureInitial = creaturesInHand.find((creature) => creature.id === creatureId);

    if (!creatureInitial) {
      console.log(`Criatura com id ${creatureId} não encontrada na mão do jogador`);
      return;
    }

    const creaturesInBoard = player.creaturesInBoard.find((creature) => creature.id === creatureId);

    if (creaturesInBoard) {
      console.log(`Criatura com id ${creatureId} já foi jogada`);
      return;
    }

    const haveCardInPosition = player.creaturesInBoard.find((creature) => {
      return creature.position.row === position.row && creature.position.column === position.column;
    })

    if (haveCardInPosition) {
      console.log('Já existe uma criatura nessa posição');
      return;
    }

    player.creaturesInBoard.push({ ...creatureInitial, position });
    const newPlayerHand =
      player.creaturesInHand.filter((creature) => creature.id !== creatureId);

    const playerCreatures = {
      initialCreatures: newPlayerHand,
      selectedCreatures: player.creaturesInBoard
    }

    try {
      await firestoreService.updatePlayerBattlefieldCreatures(gameMatch.id, player.id, playerCreatures);
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
