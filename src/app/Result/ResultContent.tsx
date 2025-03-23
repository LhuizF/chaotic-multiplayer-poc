import { Link } from "react-router-dom"

interface ResultContentProps {
  name: string
}

export const ResultContent = ({ name }: ResultContentProps) => {

  return (
    <div className='flex h-screen flex-col justify-center items-center'>
      <div className='flex flex-col items-center bg-base-200 p-4 rounded-box gap-2 w-72'>
        <h1 className="text-3xl">Partida finalizada</h1>
        <p className='text-xl'>
          O vencedor foi: <strong>{name}</strong>
        </p>
        <Link to='/' className='btn btn-primary'>Jogar novamente</Link>
      </div>
    </div >
  )
}

