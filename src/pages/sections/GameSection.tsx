import { useContext, useState } from "react";
import type { GameSectionArgs, GameDisplay } from "../../types/types";
import { SettingSection } from "./PreparationSection";
import { ProgressSection } from "./ProgressSection";
import { RoundSection } from "./RoundSection";
import { SubmitContext, useGameStore } from "../../context/context";

import { useMutation } from "urql";
import { StartRoundDocument } from "../../graphql/generated";

export function GameSection({ maxPlayers, to, from, numRounds, isHost, applyChanges, setError, startAnother }: GameSectionArgs) {
  const setStatus = useGameStore(state => state.setStatus);
  const resetState = useGameStore(state => state.reset);
  const gameId = useGameStore(state => state.gameId)
  const status = useGameStore(state => state.status)
  const userId = sessionStorage.getItem("userId")

  const [roundsResult, setRounds] = useMutation(StartRoundDocument)
  const { isFetching } = useContext(SubmitContext)

  if (!gameId) {
    location.href = "/"
    return <></>
  };

  const startGame = () => {
    setRounds({ gameId, langTranslateTo: to.code, langTranslateFrom: from.code, hostId: Number(userId) }).then(result => {

      if (result.error)
        return setError("Error: " + result.error)
      if (result.data?.startRound?.__typename === "CustomError")
        return setError(`Error (${result.data.startRound.status}): ${result.data.startRound.message}`)

      if (result.data?.startRound?.__typename === "MutationStartRoundSuccess") {
        // used by and to exit from RoundSection
        // storing game status to display appropriate components
        // incase of reconnecting clients mid-game
        setStatus("started")
      }
    })

  }

  // TODO: WRAP THE BUTTON INSTEAD IN A REACT_ROUTER LINK
  // I SUSPECT WE RE-SUBSCRIBE WHENEVER WE RELOAD PAGE
  const leaveGame = () => {
    resetState();
    location.href = "/";
  }

  const display: GameDisplay = {
    waiting: (
      isHost ?
        <>
          <SettingSection to={to} from={from} numRounds={numRounds} onSubmit={applyChanges} maxPlayers={maxPlayers} />
          <div className="flex flex-row gap-3 *:border-gray-40 *:border-2">
            <button disabled={isFetching} className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15 disabled:pointer-events-none disabled:border-gray-400" onClick={startGame}>{roundsResult.fetching ? "Loading..." : "Start"}</button>
            <button disabled={isFetching} className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15 disabled:pointer-events-none disabled:border-gray-400" onClick={leaveGame}>Leave</button>
          </div>
        </>
        : <><p>Waiting</p></>
    ),
    started: (
      <>
        <RoundSection gameId={gameId} />
        <ProgressSection />
      </>
    ),
    finished: (
      <>
        <p>Finished</p>
        {isHost && <button className="" onClick={() => { setStatus("waiting"); startAnother() }}>Start Another</button>}
      </>
    )
  }

  return (
    <div className="col-span-4 row-span-2 relative flex flex-col justify-center-safe items-center-safe [&>>*]:border-1 gap-20">
      {display[status]}
    </div>
  )
}

