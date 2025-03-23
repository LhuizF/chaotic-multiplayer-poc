import { IGameService } from "@/services/GameService/IGameService"
import { useEffect, useState } from "react"

interface UserGetPlayerWinnerProps {
  id?: string
  gameService: IGameService
}

export const useGetPlayerWinner = ({ id, gameService }: UserGetPlayerWinnerProps) => {
  const [playerWinner, setPlayerWinner] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!id) return
      gameService.getMatch(id).then(gameMatch => {
        if (gameMatch?.playerWinner) {
          setPlayerWinner(gameMatch.playerWinner)
        }
      }).finally(() => setLoading(false))
    })()
  }, [id])

  return { playerWinner, loading }
}
