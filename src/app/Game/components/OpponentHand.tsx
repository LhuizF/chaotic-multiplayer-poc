import { Creature } from "../types";

interface OpponentHandProps {
  cards: Creature[];
}

export const OpponentHand = ({ cards }: OpponentHandProps) => {
  return (
    <div className="flex gap-2">
      {cards.map((_, index) => (
        <div key={index}
          className="px-7 pb-4 border bg-[#392825] border-black border-t-0 rounded-b">
          <div className="w-14 h-7 bg-black rounded-b-full">
          </div>
        </div>
      ))}
    </div>
  )
}

