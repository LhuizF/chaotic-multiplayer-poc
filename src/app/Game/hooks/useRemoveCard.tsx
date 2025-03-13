import { IGameService } from "@/services/GameService/IGameService";
import { useGame } from "../context/GameContext";

interface UseRemoveCardProps {
  gameService: IGameService;
}

export const useRemoveCard = ({ gameService }: UseRemoveCardProps) => {
  const { gameMatchInfo, player } = useGame();

  const removeCard = async (cardId: string) => {
    const creature = player.boardCreatures.find((creature) => creature.id === cardId);

    if (!creature) {
      console.log(`Criatura com id ${cardId} não encontrada`);
      return;
    }

    const newBoardCreatures = player.boardCreatures.filter((creature) => creature.id !== cardId);
    player.handCards.push({
      id: creature.id,
      name: creature.name,
      power: creature.power,
      element: creature.element,
      health: creature.health,
      image: creature.image,
    });

    const playerGame = {
      playerId: player.id,
      handCards: player.handCards,
      boardCreatures: newBoardCreatures,
    }

    try {
      await gameService.updatePlayerGame(gameMatchInfo.id, playerGame)
    } catch (error) {
      console.log('Erro ao atualizar criatura no firebase', error);
    }
  };

  return { removeCard };
};
