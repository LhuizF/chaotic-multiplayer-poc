import { useGame } from "../context/GameContext";

export const useFinishChoicePhase = () => {
  const { gameMatchInfo, player, gameService } = useGame()

  const finishChoicePhase = async () => {
    if (player.boardCreatures.length < 3) {
      console.log('Você precisa escolher 3 cartas para continuar');
      return;
    }

    try {
      await gameService.updatePlayerStatus(gameMatchInfo.id, player.id, 'ready');
    } catch (error) {
      console.log('Erro ao atualizar fase do jogador no firebase', error);
    }
  };

  const canConfirmCreatures = player.boardCreatures.length === 3;

  return { finishChoicePhase, canConfirmCreatures };
}
