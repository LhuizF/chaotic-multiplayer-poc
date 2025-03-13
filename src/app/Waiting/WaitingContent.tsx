import { useGetGameStatus } from "./hooks/useGetGameStatus"
import { LoadingScreen } from '@/components/LoadingScreen'
import { GameNotFound } from '@/components/GameNotFound'
import { IGameService } from "@/services/GameService/IGameService"

interface WaitingContentProps {
  matchId: string
  userId: string
  gameService: IGameService
}

export const WaitingContent = ({ matchId, userId, gameService }: WaitingContentProps) => {
  const { error, gameStatus, isLoading } = useGetGameStatus({ matchId, userId, gameService })

  if (error) {
    return <GameNotFound text={error} />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const link = `${window.location.origin}/join/${matchId}`

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="w-xl bg-base-200 p-4 rounded-box">
        <p className="text-2xl text-center mb-2">
          {gameStatus === 'waiting' && 'Aguardando jogadores'}
          {gameStatus === 'playing' && 'Partida em andamento'}
          {gameStatus === 'finished' && 'Partida finalizada'}
        </p>

        {gameStatus === 'waiting' && (
          <div>
            <p className="text-center">
              Compartilhe o código da partida com um amigo para jogar.
            </p>
            <div className="join w-full my-2">
              <input
                type="text"
                value={link}
                className="input w-full join-item focus:outline-none"
                readOnly
              />
              <button
                className="btn btn-primary join-item"
                onClick={() => navigator.clipboard.writeText(link)}
              >
                Copiar link
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
