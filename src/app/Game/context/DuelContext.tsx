import { createContext, useContext, useState } from "react";
import { IGameService } from "@/services/GameService/IGameService";
import { CreatureSelected, PlayerInGame } from "../types";
import { toast } from "react-toastify";

type DuelContextData = {
  playerCard: CreatureSelected | null;
  opponentCard: CreatureSelected | null;
  selectPlayerCard: (card: CreatureSelected) => void;
  selectOpponentCard: (card: CreatureSelected) => void;
};

const DuelContext = createContext<DuelContextData>({
  playerCard: null,
  opponentCard: null,
  selectPlayerCard: () => {},
  selectOpponentCard: () => {},
});

interface DuelProviderProps {
  children: React.ReactNode;
  gameService: IGameService;
  matchId: string;
  player: PlayerInGame;
  opponent: PlayerInGame;
}

function DuelContextProvider({ children, gameService, matchId, opponent, player }: DuelProviderProps) {
  const [playerCard, setPlayerCard] = useState<CreatureSelected | null>(null)
  const [opponentCard, setOpponentCard] = useState<CreatureSelected | null>(null)

  const selectPlayerCard = (card: CreatureSelected) => {
    if (playerCard && playerCard.id === card.id) {
      setPlayerCard(null)
      return
    }

    if (playerCard) {
      toast.warn('Carta já selecionada')
      return
    }

    setPlayerCard(card)
  }

  const selectOpponentCard = async (opponentCard: CreatureSelected) => {
    if (!playerCard) {
      toast.warn('Selecione sua carta primeiro')
      return
    }
    setOpponentCard(opponentCard)

    const newDuel = {
      [player.id]: {
        creature: playerCard,
        attacks: []
      },
      [opponent.id]: {
        creature: opponentCard,
        attacks: []
      }
    }

    try {
      await gameService.startNewDuel(matchId, newDuel)
      toast.success('Duelo iniciado')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao iniciar duelo')
    }
  }

  return (
    <DuelContext.Provider value={{
      playerCard,
      opponentCard,
      selectPlayerCard,
      selectOpponentCard
    }}>
      {children}
    </DuelContext.Provider>
  );
}

const useDuel = () => {
  const context = useContext(DuelContext);

  if (!context) {
    throw new Error('DuelContextProvider not found');
  }

  return context;
};

export { useDuel, DuelContextProvider };
