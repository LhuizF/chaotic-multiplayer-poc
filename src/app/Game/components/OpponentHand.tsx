import { useGame } from "../context/GameContext"

export const OpponentHand = () => {
  const { opponent } = useGame()

  return (
    <div className="flex gap-2 justify-center h-12 w-full max-w-3xl">
      {opponent.creaturesInHand.map((_, index) => (
        <div key={index}
          className="px-7 pb-4 border bg-[#392825] border-black border-t-0 rounded-b">
          <div className="w-14 h-7 bg-black rounded-b-full">
          </div>
        </div>
      ))}
    </div>
  )
}

