export const OpponentBoard = () => {
  return (
    <div className="flex w-1/2 gap-1">
      <div className="flex flex-col w-1/2 justify-center items-center gap-1">
        <div className="border rounded card-slot"></div>
        <div className="border rounded card-slot"></div>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <div className="border rounded card-slot"></div>
      </div>
    </div>
  )
}
