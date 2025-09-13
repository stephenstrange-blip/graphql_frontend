
export default function Timer({ timer }: { timer: number }) {
  if (timer === undefined || timer === null) return <></>

  let timeLeft = `${10 - timer}`.padStart(2, "0");
  return (
    <span className="timer flex flex-row pl-5 md:p-3 xs:p-1 w-fit">
      <p className="pl-0.5 md:text-[28px] xs:text-[22px]">{`00:${timeLeft}`}</p>
    </span>
  )
}