import { Board } from "./Board";
import { PlayerHand } from './PlayerHand'
import { OpponentHand } from './OpponentHand'
import { useGame } from "../context/GameContext";
import { DisplayPlayer } from "./DisplayPlayer";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { DuelContextProvider } from "../context/DuelContext";
import { DisplayOpponent } from "./DisplayOpponent";

export const MainGame = () => {
  const { player, opponent, gameMatchInfo, gameService } = useGame()

  const isYourTurn = gameMatchInfo.isYourTurn

  useEffect(() => {
    if (gameMatchInfo.gameStatus === "select_duel") {
      toast.info("Batalha iniciada!")
    }
  }, [gameMatchInfo.gameStatus])

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
          turn={!isYourTurn}
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
          turn={isYourTurn}
          gameStatus={gameMatchInfo.gameStatus}
        />
      </div>
    </DuelContextProvider >
  )
}
