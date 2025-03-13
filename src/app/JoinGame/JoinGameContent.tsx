import { useJoinGame } from "./hooks/useJoinGame"
import { LoadingScreen } from '@/components/LoadingScreen'
import { GameNotFound } from '@/components/GameNotFound'
import { IGameService } from '@/services/GameService/IGameService'

interface JoinGameContentProps {
  matchId: string
  gameService: IGameService
}

export const JoinGameContent = ({ matchId, gameService }: JoinGameContentProps) => {
  const {
    error,
    handleJoinGame,
    errorName,
    playerName,
    setPlayerName,
    cleanErrorName,
    isLoading
  } = useJoinGame({ matchId, gameService })

  if (error) {
    return <GameNotFound text={error} />
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 bg-base-200 p-4 rounded-box">
        <p className="text-2xl text-center mb-2">Entrar na partida</p>
        <p className="text-base">Digite seu nome para começar</p>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Seu nome"
            className={`input w-full focus:outline-none ${errorName ? 'input-error' : ''}`}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onFocus={cleanErrorName}
          />
        </div>

        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={handleJoinGame}>
            Entrar
          </button>
        </div>
      </div>

      {isLoading && <LoadingScreen />}
    </main>
  )
}
