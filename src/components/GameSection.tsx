import { useState, type JSX, type MouseEvent, type MouseEventHandler } from "react";
import type { langTranslate, GameDisplay } from "../types/types";
import { PreparationSection } from "./PreparationSection";
import { ProgressSection } from "./ProgressSection";
import { RoundSection } from "./RoundSection";
import { useGameStore } from "./context";

import { useMutation } from "urql";
import { StartRoundDocument } from "../graphql/generated";

export function GameSection({ to, from, numRounds, applyChanges, setError }: { to: langTranslate, from: langTranslate, numRounds: number, applyChanges: React.FormEventHandler<HTMLFormElement>, setError: React.Dispatch<React.SetStateAction<string | null>> }) {
  const [gameStatus, setGameStatus] = useState<keyof GameDisplay>("waiting")
  const { gameId, reset: resetState } = useGameStore()
  const [roundsResult, setRounds] = useMutation(StartRoundDocument)

  if (!gameId) { location.href = "/" };

  const startGame = () => {
    setRounds({ gameId, langTranslateTo: to.code, langTranslateFrom: from.code }).then(result => {

      if (result.error)
        return setError("Error: " + result.error)
      if (result.data?.startRound?.__typename === "CustomError")
        return setError(`Error (${result.data.startRound.status}): ${result.data.startRound.message}`)

      if (result.data?.startRound?.__typename === "MutationStartRoundSuccess")
        // used by and to exit from RoundSection in case of errors
        setGameStatus("started");
    })

  }

  const leaveGame = () => {
    resetState();
    location.href = "/";
  }


  const display: GameDisplay = {
    waiting: (
      <>
        <PreparationSection to={to} from={from} numRounds={numRounds} onSubmit={applyChanges} />
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" onClick={startGame}>{roundsResult.fetching ? "Loading..." : "Start"}</button>
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" onClick={leaveGame}>Leave</button>
      </>
    ),
    started: (
      <>
        <RoundSection gameId={gameId ?? 0} exitRound={setGameStatus} />
        <ProgressSection />
      </>
    ),
    finished: (
      <p>Finished</p>
    )
  }

  return (
    <div className="col-span-3 row-span-3 relative flex justify-center-safe items-center-safe [&>*]:border-1 ">
      {display[gameStatus]}
    </div>
  )
}

