import { useContext } from "react";
import type { GameSectionArgs, GameDisplay } from "../../types/types";
import { SettingSection } from "./PreparationSection";
import { ProgressSection } from "./ProgressSection";
import { RoundSection } from "./RoundSection";
import { SubmitContext, useGameStore } from "../../context/context";

import { useMutation } from "urql";
import { ExitGameDocument, StartRoundDocument } from "../../graphql/generated";
import { Link } from "react-router";

export function GameSection({ maxPlayers, to, from, numRounds, isHost, applyChanges, setError, startAnother }: GameSectionArgs) {
  const setStatus = useGameStore(state => state.setStatus);
  const resetState = useGameStore(state => state.reset);
  const gameId = useGameStore(state => state.gameId)
  const status = useGameStore(state => state.status)
  const userId = sessionStorage.getItem("userId")

  const [roundsResult, setRounds] = useMutation(StartRoundDocument)
  const [exitGameResult, exitGame] = useMutation(ExitGameDocument)
  const { isUpdating } = useContext(SubmitContext)

  const pageIsUpdating = isUpdating || exitGameResult.fetching || roundsResult.fetching

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

  const leaveGame = () => {
  
    // if host, removes all participants in the game
    // else, removes just the participant who left
    exitGame({ gameId, hostId: Number(userId), isHost }).then(result => {
      if (result.error)
        return setError("Error: " + result.error)
      if (result.data?.exitGame?.__typename === "CustomError")
        return setError(`Error (${result.data.exitGame.status}): ${result.data.exitGame.message}`)

      // if client is host, reset status here
      // else, non-host participants listen to game status changes in GamePage
      if (result.data?.exitGame?.__typename === "MutationExitGameSuccess")
        resetState();
    })
  }

  const display: GameDisplay = {
    waiting: (
      isHost ?
        <>
          <SettingSection to={to} from={from} numRounds={numRounds} onSubmit={applyChanges} maxPlayers={maxPlayers} />
          <div className="xs:pt-3 flex flex-row gap-3 xs:justify-center-safe *:border-gray-40 *:*:border-2">
            <button disabled={pageIsUpdating} className="hover:bg-gray-300 hover:text-dark hover:border-transparent p-2.5 border-2 rounded-[5px] min-w-17 disabled:pointer-events-none disabled:border-gray-400" onClick={startGame}>{pageIsUpdating ? "Loading..." : "Start"}</button>
            <Link to={"/"}><button disabled={pageIsUpdating} className="hover:bg-gray-300 hover:text-dark hover:border-transparent  border-2 p-2.5 rounded-[5px] min-w-17 disabled:pointer-events-none disabled:border-gray-400" onClick={leaveGame}>Leave</button></Link>
          </div>
        </>
        : <div className="flex flex-col gap-3.5">
          <p className="text-center">Waiting</p>
          <Link to={"/"}><button disabled={pageIsUpdating} className="hover:bg-gray-300 hover:text-dark hover:border-transparent  border-2 p-2.5 rounded-[5px] min-w-17 disabled:pointer-events-none disabled:border-gray-400" onClick={leaveGame}>Leave</button></Link>
        </div>
    ),
    started: (
      <>
        <RoundSection gameId={gameId} />
        <ProgressSection numRounds={numRounds} />
      </>
    ),
    finished: (
      <div className="flex flex-col gap-3.5 justify-center-safe items-center-safe ">
        <p className="">Finished</p>
        {isHost && <button className="hover:bg-gray-300 hover:text-dark hover:border-transparent border-2 p-2.5 rounded-[5px] min-w-17 disabled:pointer-events-none disabled:border-gray-400" onClick={() => { setStatus("waiting"); startAnother() }}>Start Another</button>}
      </div>
    )
  }

  return (
    <div className="bg-primary text-light xs:p-5 xl:col-span-4 xl:row-span-2 md:col-span-full md:row-span-3 relative md:flex md:flex-col md:justify-center-safe md:items-center-safe [&>>*]:border-1 xl:gap-20">
      {display[status]}
    </div>
  )
}

