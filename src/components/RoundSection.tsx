import { useSubscription } from "urql";
import { PlayerInput } from "./Input"
import { PreCountDownDocument, PostCountDownDocument, RoundDocument, TimerDocument, type RoundPayload, PhaseDocument } from "../graphql/generated";
import type { GameDisplay, RoundState } from "../types/types";
import { sleep } from "../utils/utils";

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
    id: null,
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
    sleep(4000).then(() => location.reload())

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
    <div className="flex flex-col justify-baseline w-full h-[80%] gap-3">
      <Timer timer={roundState.timer} />
      <Countdown countDown={{ post: roundState.postCountDown, pre: roundState.preCountDown }} phase={roundState.phase} />
      <span className="flex flex-col border-1 items-center-safe h-[50%] justify-around">
        <Answer />
        <span>
          <p className="roundNumber text-center">Round: {roundState.round.roundNumber ?? ''}</p>
          <p className="from text-[48px]">{roundState.round.wordTranslateFrom ?? ""}</p>
        </span>
      </span>
      <PlayerInput isRoundActive={roundState.phase} roundId={roundState.id} />
    </div>
  )
}

function Countdown({ countDown, phase }: { countDown: { post: number, pre: number }, phase: RoundState }) {

  if ((countDown.post === null || countDown.post === undefined) && (countDown.pre === null || countDown.pre === undefined))
    return <></>

  if (phase === "finished")
    return <p className="text-center text-[32px]">Finished!</p>

  return (
    <span className="countDown flex flex-row justify-center-safe text-2xl">
      {(countDown.pre ?? countDown.post) <= 0 && phase === "inRound"
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
    <span className="timer flex flex-row pl-5 p-3 w-fit">
      <p className="pl-0.5 text-[28px]">{`00:${timeLeft >= 10 ? timeLeft : `0${timeLeft}`}`}</p>
    </span>
  )
}

