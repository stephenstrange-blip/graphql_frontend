import { useSubscription } from "urql";
import { PlayerInput } from "./Input"
import { PreCountDownDocument, PostCountDownDocument, RoundDocument, TimerDocument, type RoundPayload, PhaseDocument } from "../graphql/generated";
import type { GameDisplay, RoundState } from "../types/types";

export function RoundSection({ gameId }: { gameId: number, exitRound: React.Dispatch<React.SetStateAction<keyof GameDisplay>> }) {
  const [preCd] = useSubscription({ query: PreCountDownDocument, variables: { gameId } });
  const [postCd] = useSubscription({ query: PostCountDownDocument, variables: { gameId } });
  const [t] = useSubscription({ query: TimerDocument, variables: { gameId } });
  const [r] = useSubscription({ query: RoundDocument, variables: { gameId } })
  const [p] = useSubscription({ query: PhaseDocument, variables: { gameId } })

  // only need one error from any of the subscriptions
  const getCustomError = () => {
    if (r.data && r.data.round?.__typename === "CustomError")
      return r.data.round
    if (t.data && t.data.timer?.__typename === "CustomError")
      return t.data.timer
    if (preCd.data && preCd.data.preCountDown?.__typename === "CustomError")
      return preCd.data.preCountDown
    if (postCd.data && postCd.data.postCountDown?.__typename == "CustomError")
      return postCd.data.postCountDown
    else return
  }

  let error = t.error ?? (r.error ?? (preCd.error ?? postCd.error))
  let customError = getCustomError()

  const roundState = {
    preCountDown: 3,
    postCountDown: 3,
    timer: 0,
    round: {} as RoundPayload,
    phase: "idle" as RoundState,
  }

  if (r.data && r.data.round?.__typename === "SubscriptionRoundSuccess")
    roundState.round = r.data.round.data

  if (preCd.data && preCd.data.preCountDown?.__typename === "SubscriptionPreCountDownSuccess")
    roundState.preCountDown = preCd.data.preCountDown.data

  if (postCd.data && postCd.data.postCountDown?.__typename === "SubscriptionPostCountDownSuccess")
    roundState.postCountDown = postCd.data.postCountDown.data

  if (t.data && t.data.timer?.__typename === "SubscriptionTimerSuccess")
    roundState.timer = t.data.timer.data

  if (p.data && p.data.phase?.__typename === "SubscriptionPhaseSuccess") {
    const phase = p.data.phase.data

    if (!(["idle", "preCountDown", "inRound", "finished"].includes(phase)))
      customError = { message: `Unknown round phase ${phase}. Please check Server`, status: 501, __typename: "CustomError" }

    roundState.phase = phase as RoundState
  }


  if (error || customError) {
    reload(4000).then(() => location.reload())
    
    return (
      <div className="flex flex-col justify-around items-center-safe w-full h-[70%] *:bg-amber-200">
        {error && <span>{error.message}</span>}
        {customError && <span>{customError ? `Error (${customError.status}): ${customError.message}` : ''}</span>}
      </div>
    )

  }


  function Answer() {
    if (roundState.round.wordTranslateTo)
      return <span className="flex flex-col justify-center-safe items-center-safe">Answer is <p className="text-[38px]">{roundState.round.wordTranslateTo}</p></span>
    else
      return <></>
  }

  return (
    <div className="flex flex-col justify-around w-full h-[70%]">
      <span className="flex flex-col">
        <p>Timer: {roundState.timer}</p>
        <p>Pre-CountDown: {roundState.preCountDown}</p>
        <p>Post-CountDown: {roundState.postCountDown}</p>
        <p>Phase: {roundState.phase}</p>
      </span>
      <span className="flex flex-col border-1 items-center-safe h-[50%] justify-around">
        {roundState.phase === "finished" ? <p>Finished!</p> :
          <Countdown countDown={{ post: roundState.postCountDown, pre: roundState.preCountDown }} />}
        <Timer timer={roundState.timer} />
        <Answer />
        <span>
          <p className="roundNumber text-center">Round: {roundState.round.roundNumber ?? ''}</p>
          <p className="from text-[48px]">{roundState.round.wordTranslateFrom ?? ""}</p>
        </span>
      </span>
      <PlayerInput isRoundActive={roundState.phase} />
    </div>
  )
}

function Countdown({ countDown }: { countDown: { post: number, pre: number } }) {

  if ((countDown.post === null || countDown.post === undefined) && (countDown.pre === null || countDown.pre === undefined))
    return <></>

  return (
    <span className="countDown flex flex-row">
      {(countDown.pre ?? countDown.post) <= 0
        ? (<p>Go!!!</p>)
        : (<p>{`${countDown.pre ?? countDown.pre}`}</p>)
      }
    </span>
  )
}

function Timer({ timer }: { timer: number }) {
  if (timer === undefined || timer === null) return <></>

  let timeLeft = 10 - timer;
  return (
    <span className="timer flex flex-row">
      Time Left: <p className="pl-0.5">{`00:${timeLeft >= 10 ? timeLeft : `0${timeLeft}`}`}</p>
    </span>
  )
}

async function reload(n: number) {
  return await new Promise(resolve => setTimeout(resolve, n))
}