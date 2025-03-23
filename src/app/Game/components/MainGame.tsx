import { Board } from "./Board";
import { PlayerHand } from './PlayerHand'
import { OpponentHand } from './OpponentHand'
import { useGame } from "../context/GameContext";
import { DisplayPlayer } from "./DisplayPlayer";
import { DuelContextProvider } from "../context/DuelContext";
import { DisplayOpponent } from "./DisplayOpponent";

export const MainGame = () => {
  const { player, opponent, gameMatchInfo, gameService, duel } = useGame()

  return (
    <DuelContextProvider
      gameService={gameService}
      matchId={gameMatchInfo.id}
      player={player}
      opponent={opponent}
    >
      <div className="h-full flex items-center justify-evenly">
        <DisplayOpponent
          name={opponent.name}
          turn={!gameMatchInfo.isYourTurn}
          gameStatus={gameMatchInfo.gameStatus}
        />

        <div className="flex flex-col items-center h-full">
          <OpponentHand />
          <Board />
          <PlayerHand />
        </div>

        <DisplayPlayer
          id={player.id}
          name={player.name}
          chooseTurn={gameMatchInfo.isYourTurn}
          gameStatus={gameMatchInfo.gameStatus}
          duelTurn={!!duel?.playerTurn && gameMatchInfo.gameStatus === 'duel'}
        />
      </div>
    </DuelContextProvider >
  )
}
