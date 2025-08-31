import type { RoundPhase } from "../types/types"

export default function Countdown({ countDown, phase }: { countDown: { post: number, pre: number }, phase: RoundPhase }) {

  if ((countDown.post === null || countDown.post === undefined) && (countDown.pre === null || countDown.pre === undefined))
    return <></>

  function Information() {
    if (phase === "finished" || phase === "exit")
      return <p className="text-center text-[32px]">Finished!</p>

    else if (phase === "idle")
      return <></>

    else if ((countDown.pre ?? countDown.post) <= 0 && phase === "inRound")
      return <p>Go!!!</p>

    else if ((countDown.pre ?? countDown.post) > 0 && phase === "preCountDown")
      return (<p>{`${countDown.pre ?? countDown.pre}`}</p>)

  }

  return (
    <span className="countDown flex flex-row justify-center-safe text-2xl">
      <Information />
    </span>
  )
}