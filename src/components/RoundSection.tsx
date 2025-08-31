import { CombinedError, useSubscription } from "urql";
import { PlayerInput } from "./Input"
import { PreCountDownDocument, PostCountDownDocument, RoundDocument, TimerDocument, type RoundPayload, PhaseDocument, type CustomError, type PhaseSubscription } from "../graphql/generated";
import type { GameDisplay, RoundPhase } from "../types/types";
import { sleep } from "../utils/utils";
import { useGameStore } from "../context/context";
import { useState } from "react";

export function RoundSection({ gameId, exitRound }: { gameId: number, exitRound: React.Dispatch<React.SetStateAction<keyof GameDisplay>> }) {
  const [isCorrect, setIsCorrect] = useState(false)
  const [preCd] = useSubscription({ query: PreCountDownDocument, variables: { gameId } });
  const [postCd] = useSubscription({ query: PostCountDownDocument, variables: { gameId } });
  const [t] = useSubscription({ query: TimerDocument, variables: { gameId } });
  const [r] = useSubscription({ query: RoundDocument, variables: { gameId } })
  const [p] = useSubscription({ query: PhaseDocument, variables: { gameId } }, handlePhase)

  // setting isCorrect to false every change of phase
  // disables user input found inside the PlayerInput component
  function handlePhase(previous: PhaseSubscription | undefined, current: PhaseSubscription): PhaseSubscription {
    if (previous && (previous !== current))
      setIsCorrect(false)
    return current
  }

  const setStatus = useGameStore(state => state.setStatus)

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
    phase: "idle" as RoundPhase,
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
    const newPhase = p.data.phase.data

    // exit game if an unknown phase somehow appears
    if (!(["idle", "preCountDown", "inRound", "finished", "exit"].includes(newPhase))) {
      roundState.phase = "exit"
      return (<RoundError customError={
        {
          message: `Unknown round phase ${newPhase}. Please check Server`,
          status: 501,
          __typename: "CustomError"
        }} />)
    }

    // let the client see the answer to last round 
    // before changing the display
    if (newPhase === "exit")
      setTimeout(() => {
        // store game status to display appropriate components
        // incase of reconnecting clients post-game
        setStatus("finished");
        exitRound("finished");

      }, 3000)

    // update the phase as usual
    roundState.phase = newPhase as RoundPhase
  }

  if (error || customError) {
    sleep(4000).then(() => location.reload())
    return (<RoundError error={error} customError={customError} />)
  }

  return (
    <div className="flex flex-col justify-baseline w-full h-[80%] gap-3">
      <Timer timer={roundState.timer} />
      <Countdown countDown={{ post: roundState.postCountDown, pre: roundState.preCountDown }} phase={roundState.phase} />
      <span className="flex flex-col border-1 items-center-safe h-[50%] justify-around">
        <Answer wordTranslateTo={roundState.round.wordTranslateTo} />
        <span>
          <p className="roundNumber text-center">Round: {roundState.round.roundNumber ?? ''}</p>
          <p className="from text-[48px]">{roundState.round.wordTranslateFrom ?? ""}</p>
        </span>
      </span>
      <PlayerInput isRoundActive={roundState.phase} roundId={roundState.round.id} isCorrect={isCorrect} setIsCorrect={setIsCorrect} />
    </div>
  )
}

function Answer({ wordTranslateTo }: { wordTranslateTo: string | undefined | null }) {
  if (wordTranslateTo)
    return <span className="flex flex-col justify-center-safe items-center-safe">Answer is <p className="text-[38px]">{wordTranslateTo}</p></span>

  return <></>
}

function RoundError({ error, customError }: { error?: CombinedError, customError?: CustomError }) {
  return (
    <div className="flex flex-col justify-around items-center-safe w-full h-[70%] *:bg-amber-200">
      {error && <span>{error.message}</span>}
      {customError && <span>{customError ? `Error (${customError.status}): ${customError.message}` : ''}</span>}
    </div>
  )
}

function Countdown({ countDown, phase }: { countDown: { post: number, pre: number }, phase: RoundPhase }) {

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

function Timer({ timer }: { timer: number }) {
  if (timer === undefined || timer === null) return <></>

  let timeLeft = `${10 - timer}`.padStart(2, "0");
  return (
    <span className="timer flex flex-row pl-5 p-3 w-fit">
      <p className="pl-0.5 text-[28px]">{`00:${timeLeft}`}</p>
    </span>
  )
}

