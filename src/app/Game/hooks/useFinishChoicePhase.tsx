import { useGame } from "../context/GameContext";
import { toast } from 'react-toastify';

export const useFinishChoicePhase = () => {
  const { gameMatchInfo, player, gameService, opponent } = useGame()

  const finishChoicePhase = async () => {
    if (player.boardCreatures.length < 3) {
      toast.error('Você precisa escolher 3 cartas para continuar');
      return;
    }

    const updateGameStatus = opponent.status === 'ready';

    try {
      await gameService.finishChoicePhase(gameMatchInfo.id, player.id, updateGameStatus);
    } catch (error) {
      console.error('Erro ao atualizar fase do jogador no firebase', error);
    }
  };

  const canConfirmCreatures = player.boardCreatures.length === 3;

  return { finishChoicePhase, canConfirmCreatures };
}
