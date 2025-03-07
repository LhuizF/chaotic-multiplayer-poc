export const Board = () => {
  return (
    <div className=" flex flex-col bg-base-200 flex-1 w-3xl gap-1 m-1 p-1 border border-white rounded">
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex flex-1 justify-center">
          <div className="border rounded h-full aspect-square"></div>
        </div>
        <div className="flex flex-1 justify-center gap-1">
          <div className="border rounded h-full aspect-square"></div>
          <div className="border rounded h-full aspect-square"></div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex flex-1 justify-center gap-1">
          <div className="border rounded h-full aspect-square"></div>
          <div className="border rounded h-full aspect-square"></div>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="border rounded h-full aspect-square"></div>
        </div>
      </div>
    </div>
  )
}
