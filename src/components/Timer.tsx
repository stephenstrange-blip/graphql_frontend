
export default function Timer({ timer }: { timer: number }) {
  if (timer === undefined || timer === null) return <></>

  let timeLeft = `${10 - timer}`.padStart(2, "0");
  return (
    <span className="timer flex flex-row pl-5 p-3 w-fit">
      <p className="pl-0.5 text-[28px]">{`00:${timeLeft}`}</p>
    </span>
  )
}