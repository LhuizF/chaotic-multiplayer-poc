import { firestoreService } from "@/services/FirestoreService";
import { useGame } from "../context/GameContext";

export const useRemoveCard = () => {
  const { gameMatch, player } = useGame();

  const removeCard = async (cardId: string) => {
    const creaturesInBoard = player.creaturesInBoard
    const creature = creaturesInBoard.find((creature) => creature.id === cardId);

    if (!creature) {
      console.log(`Criatura com id ${cardId} não encontrada`);
      return;
    }

    const newCreaturesInBoard = creaturesInBoard.filter((creature) => creature.id !== cardId);
    player.creaturesInHand.push({
      id: creature.id,
      name: creature.name,
      power: creature.power,
      element: creature.element,
      health: creature.health,
      image: creature.image,
    });

    const playerCreatures = {
      selectedCreatures: newCreaturesInBoard,
      initialCreatures: player.creaturesInHand,
    }

    try {
      await firestoreService.updatePlayerBattlefieldCreatures(gameMatch.id, player.id, playerCreatures);
    } catch (error) {
      console.log('Erro ao atualizar criatura no firebase', error);
    }
  };

  return { removeCard };
};
