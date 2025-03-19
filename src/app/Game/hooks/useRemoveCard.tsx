import { toast } from "react-toastify";
import { useGame } from "../context/GameContext";

export const useRemoveCard = () => {
  const { gameMatchInfo, player, gameService } = useGame();

  const removeCard = async (cardId: string) => {
    const creature = player.boardCreatures.find((creature) => creature.id === cardId);

    if (!creature) {
      toast.error(`Erro: carta não encontrada`);
      return;
    }

    const newBoardCreatures = player.boardCreatures.filter((creature) => creature.id !== cardId);
    player.handCreatures.push({
      id: creature.id,
      name: creature.name,
      power: creature.power,
      element: creature.element,
      health: creature.health,
      image: creature.image,
    });

    const playerGame = {
      playerId: player.id,
      handCreatures: player.handCreatures,
      boardCreatures: newBoardCreatures,
    }

    try {
      await gameService.updatePlayerGame(gameMatchInfo.id, playerGame)
    } catch (error) {
      console.error('Erro ao atualizar criatura no firebase', error);
    }
  };

  return { removeCard };
};
