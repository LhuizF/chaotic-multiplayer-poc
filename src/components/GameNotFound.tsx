import { useNavigate } from "react-router-dom";

export const GameNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen flex-col justify-center items-center'>
      <div className='flex flex-col items-center bg-base-200 p-4 rounded-box gap-2'>
        <p className='text-xl'>Game não encontrado</p>
        <button className='btn btn-primary' onClick={() => navigate('/')}>Voltar</button>
      </div>
    </div >
  )
}
