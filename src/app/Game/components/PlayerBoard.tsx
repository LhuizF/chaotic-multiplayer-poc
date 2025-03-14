import { CardSlot } from "./CardSlot"

export const PlayerBoard = () => {

  return (
    <div className="flex flex-1 w-1/2 gap-2">
      <div className="flex w-1/2 flex-1 items-center justify-center gap-2">
        <CardSlot position={{ row: 1, column: 2 }} />
      </div>
      <div className="flex w-1/2 flex-col flex-1 justify-center gap-2">
        <CardSlot position={{ row: 1, column: 1 }} />
        <CardSlot position={{ row: 2, column: 1 }} />
      </div>
    </div>
  )
}

