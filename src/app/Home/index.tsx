import { useCreateGame } from "./hooks/useCreateGame"
import { LoadingScreen } from '@/components/LoadingScreen'

export const Home = () => {
  const { createGame, erroName, setErroName, isLoading, playerName, setPlayerName } = useCreateGame()

  return (
    <main className="flex flex-col items-center justify-center h-screen">

      <fieldset className="fieldset w-96 bg-base-200 p-4 rounded-box">
        <p className="text-2xl text-center mb-2">Bem-vindo ao jogo</p>
        <p className="text-base">Digite seu nome para começar</p>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Seu nome"
            className={`input w-full focus:outline-none ${erroName ? 'input-error' : ''}`}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onFocus={() => setErroName(false)}
          />
        </div>


        {/* <p className="text-base">Entre em uma partida já criada</p>
        <div className="join">
          <input type="text" className="input join-item focus:outline-none" placeholder="Id da partida" />
          <button className="btn btn-primary join-item">Entrar</button>
        </div>
        <div className="divider">OU</div> */}
        <button className="btn btn-primary" onClick={createGame}>
          Criar partida
        </button>
      </fieldset>

      {isLoading && <LoadingScreen />}
    </main>
  )
}
