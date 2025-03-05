import { useNavigate } from "react-router-dom";

interface GameNotFoundProps {
  text?: string
}

export const GameNotFound = ({ text }: GameNotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen flex-col justify-center items-center'>
      <div className='flex flex-col items-center bg-base-200 p-4 rounded-box gap-2'>
        <p className='text-xl'>
          {text || 'Partida não encontrada'}
        </p>
        <button className='btn btn-primary' onClick={() => navigate('/')}>Voltar</button>
      </div>
    </div >
  )
}
