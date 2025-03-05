import { useGetGame } from "./hooks/useGetGame"
import { LoadingScreen } from '@/components/LoadingScreen'
import { GameNotFound } from '@/components/GameNotFound'

interface JoinGameContentProps {
  id: string
}

export const JoinGameContent = ({ id }: JoinGameContentProps) => {

  const {
    error,
    handleJoinGame,
    errorName,
    playerName,
    setPlayerName,
    cleanErrorName,
    isLoading
  } = useGetGame(id)

  if (error) {
    return <GameNotFound />
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 bg-base-200 p-4 rounded-box">
        <p className="text-2xl text-center mb-2">Entrar na partida</p>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Seu nome"
            className={`input focus:outline-none ${errorName ? 'input-error' : ''}`}
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
