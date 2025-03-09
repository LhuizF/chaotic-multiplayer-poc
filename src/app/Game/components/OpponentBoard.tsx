export const OpponentBoard = () => {
  return (
    <div className="flex flex-col flex-1 gap-1">
      <div className="flex flex-1 justify-center">
        <div className="border rounded h-full aspect-square"></div>
      </div>
      <div className="flex flex-1 justify-center gap-1">
        <div className="border rounded h-full aspect-square"></div>
        <div className="border rounded h-full aspect-square"></div>
      </div>
    </div>
  )
}
