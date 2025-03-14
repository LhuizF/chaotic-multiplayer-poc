interface BatterBannerProps {
  text: string;
}

export const BatterBanner = ({ text }: BatterBannerProps) => {
  return (
    <div className="absolute top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]">
      <div className="flex justify-center items-center h-full">
        <div className="bg-primary w-3xl h-40 p-4 rounded-xl flex flex-col justify-center items-center">
          <p className="text-lg font-bold">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
