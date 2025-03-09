import { useDrop } from "react-dnd"

export const PlayerBoard = () => {

  return (
    <div className="flex flex-col flex-1 gap-1">
      <div className="flex flex-1 justify-center">
        <CardSlot />
        <CardSlot />
      </div>
      <div className="flex flex-1 justify-center gap-1">
        <CardSlot />
      </div>
    </div>
  )
}

const CardSlot = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (i) => {
      console.log(i)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div
      ref={drop}
      className="border rounded h-full aspect-square"
      style={{ backgroundColor: isOver ? 'green' : 'transparent' }}
    >
    </div>
  )
}
