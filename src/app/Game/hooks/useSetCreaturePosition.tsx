import { PlayerBattlefield, Position } from "../types";
import { useEffect, useState } from "react";
import { firestoreService } from '@/services/FirestoreService'
import { Creature } from "@/cards/creatures";

interface UseSetCreaturePositionProps {
  userId: string;
  gameMatchId: string;
  playerBattlefield: PlayerBattlefield
  position: Position
}

export const useSetCreaturePosition = ({ gameMatchId, playerBattlefield, userId, position }: UseSetCreaturePositionProps) => {
  const [cardHover, setCardHover] = useState<Creature | null>(null)
  const [cardSelected, setCardSelected] = useState<Creature | null>(null)

  const setCreaturePosition = async (creatureId: string, position: Position) => {
    const playerCreatures = playerBattlefield.creatures;

    if (!playerCreatures) {
      console.log('playerCreatures não encontrado');
      return;
    }

    const creatureInitial = playerCreatures.initialCreatures.find((creature) => creature.id === creatureId);

    if (!creatureInitial) {
      console.log(`Criatura com id ${creatureId} não encontrada em initialCreatures`);
      return;
    }

    const creatureSelected = playerCreatures.selectedCreatures.find((creature) => creature.id === creatureId);

    if (creatureSelected) {
      console.log(`Criatura com id ${creatureId} já foi selecionada`);
      return;
    }

    const haveCardInPosition = playerCreatures.selectedCreatures.find((creature) => {
      return creature.position.row === position.row && creature.position.column === position.column;
    })

    if (haveCardInPosition) {
      console.log('Já existe uma criatura nessa posição');
      return;
    }

    playerCreatures.selectedCreatures.push({ ...creatureInitial, position });
    playerCreatures.initialCreatures =
      playerCreatures.initialCreatures.filter((creature) => creature.id !== creatureId);


    try {
      await firestoreService.updatePlayerBattlefieldCreatures(gameMatchId, userId, playerCreatures);
      setCardSelected(null);
      console.log({ gameMatchId, userId, playerCreatures });
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
