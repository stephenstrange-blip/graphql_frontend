import type { Route } from "./+types/Game"
import { useEffect, useRef, useState } from "react"
import { SubmitContext, useGameStore } from "../context/context"
import { useMutation, useQuery, useSubscription } from "urql"
import { GameDocument, GameStatusDocument, GameUpdatedDocument, ParticipantDocument, PointUpdatedDocument, UpdateGameDocument, type PointUpdatedSubscription } from "../graphql/generated"
import type { GameDisplay, GamePageData, Participants, updateGameSettings } from "../types/types"
import { filterParticipants, formatParticipantPayload, parseFormData } from "../utils/utils"
import { GameSection } from "./sections/GameSection"
import { PlayerSection, OpponentSection } from "./sections/ParticipantSection"

export default function GamePage(args: Route.ComponentProps) {
  const userId = sessionStorage.getItem("userId")

  const gameId = useGameStore(state => state.gameId);
  const gameStatus = useGameStore(state => state.status)
  const setStatus = useGameStore(state => state.setStatus)
  const resetStatus = useGameStore(state => state.reset)

  // Need to put pointRef above handleUpdatedPoint
  const pointRef = useRef<HTMLSpanElement>(null)
  const [updatedPoint] = useSubscription({ query: PointUpdatedDocument, variables: { gameId } }, handleUpdatedPoint)
  const [newGameSettings] = useSubscription({ query: GameUpdatedDocument, variables: { gameId } })
  const [newParticipants] = useSubscription({ query: ParticipantDocument, variables: { gameId, userId: Number(userId) } })

  const [gameQueryResult] = useQuery({ query: GameDocument, variables: { gameId } })
  const [updateGameResult, updateGame] = useMutation(UpdateGameDocument)

  const [error, setError] = useState(gameQueryResult.error?.message ? gameQueryResult.error.message : null)
  const [participants, setParticipants] = useState<Participants>([])

  let data: GamePageData = {}
  //  Get data from query(initial) or subscription(latest)
  if (newGameSettings.data?.gameUpdated) {
    data = newGameSettings.data.gameUpdated
  } else if (gameQueryResult.data?.game?.__typename === "QueryGameSuccess") {
    data = gameQueryResult.data.game.data;
  }

  useEffect(() => {
    // update participants based on subscription updates
    if (newParticipants.data?.playerJoined) {
      const update = formatParticipantPayload(newParticipants.data?.playerJoined) || []
      const leavingParticipantsID = update.filter(item => !item.isJoining).map(item => item.playerId)
      const joiningParticipants = update.filter(item => item.isJoining)

      setParticipants(prev => {
        // remove leaving participants from previous list
        const inGameParticipants = prev.filter(player => !(leavingParticipantsID.includes(player.playerId)))
        return [...inGameParticipants, ...joiningParticipants]
      })
    }

  }, [newParticipants.data])

  useEffect(() => {
    // update participants based on initial query
    if (data.participants)
      setParticipants(data.participants)

  }, [data.participants])

  // initial data has slightly different properties from updated data
  const from = data.translateFrom ?? data.langTranslateFrom
  const to = data.translateTo ?? data.langTranslateTo

  // player details, host or not, is displayed in a different component to opponents
  const { player, opponents } = filterParticipants(participants ?? [])

  const isHost = data.hostId === Number(userId)
  const [newGameStatus] = useSubscription({ query: GameStatusDocument, variables: { gameId, userId: Number(userId) } })

  // Restart points subscription - consumed by Progress and 
  // Participant section - on every game status change
  useEffect(() => {
    updatedPoint.data = undefined
  }, [gameStatus])

  useEffect(() => {
    const payload = newGameStatus.data

    // update non-host participants to game status changes
    // hosts will reset status at GameSection
    if (!isHost && payload && payload.gameStatusUpdated?.__typename === "SubscriptionGameStatusUpdatedSuccess") {
      const status = payload.gameStatusUpdated.data

      // reset game status if told to exit from game 
      if (status === "exit")
        resetStatus()
      // otherwise, update game status
      else
        setStatus(status as keyof GameDisplay)
    }

  }, [isHost, newGameStatus.data])


  // This handler is for when user changes game settings prior to game
  const applyChanges: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)

    const formData = new FormData(e.currentTarget);
    const parsedData = parseFormData<updateGameSettings>(formData, { numRounds: "number", from: "number", to: "number", maxPlayers: "number" })

    if (parsedData.from === parsedData.to)
      return setError("Cannot translate from the same language!")

    if (data.numRounds === parsedData.numRounds
      && Number(from?.id) === parsedData.from
      && Number(to?.id) === parsedData.to
      && data.maxPlayers === parsedData.maxPlayers)
      return setError("No changes detected!")

    const payload = {
      gameId: gameId || 1,
      numRounds: parsedData.numRounds,
      langTranslateFromId: parsedData.from,
      langTranslateToId: parsedData.to,
      maxPlayers: parsedData.maxPlayers
    }

    // Triggers the subscription event in the backend
    updateGame(payload).then(result => {
      if (result.error)
        return setError("Error: " + result.error)
      if (result.data?.changeGameSetting?.__typename === "CustomError")
        return setError(`Error (${result.data.changeGameSetting.status}): ${result.data?.changeGameSetting.message}`)
    })
  }

  // This handler is for when a game ends, and host wants to start another game
  const startAnother = () => {

    if (!from?.id || !to?.id)
      return setError("Error: There's no from and to language ID. Reload the page")

    const payload = {
      gameId: gameId || 1,
      numRounds: data.numRounds,
      langTranslateFromId: Number(from.id),
      langTranslateToId: Number(to.id),
      maxPlayers: 6,
    }

    updateGame(payload).then(result => {
      if (result.error)
        return setError("Error: " + result.error)
      if (result.data?.changeGameSetting?.__typename === "CustomError")
        return setError(`Error (${result.data.changeGameSetting.status}): ${result.data?.changeGameSetting.message}`)
    })
  }


  function handleUpdatedPoint(_: PointUpdatedSubscription | undefined, newPoint: PointUpdatedSubscription) {
    // re-trigger animation on every new score update
    if (newPoint.point && pointRef.current) {
      pointRef.current.classList.remove("fleeting-point")
      void pointRef.current.offsetWidth // forces reflow
      pointRef.current.classList.add("fleeting-point")
    }
    return newPoint
  }

  return (
    <>
      <p className={`bg-red-800 text-white w-full text-center p-1.5 ${error ?? 'hidden'}`}>{error}</p>
      <main className="overflow *:shadow-[0_5px_5px_rgba(0,0,0,.5)] *:rounded-2xl **:delay-100 ease-in-out xs:w-full md:size-full  md:grid xl:grid-rows-2 xl:grid-cols-5 md:grid-rows-4 md:grid-cols-2 p-[1rem] gap-4 xs:flex xs:flex-col-reverse">
        <PlayerSection player={player} updatedPoint={updatedPoint}/>
        <OpponentSection opponents={opponents} numRounds={data.numRounds!} toCode={to?.code ?? ""} fromCode={from?.code ?? ""} updatedPoint={updatedPoint} />
        <SubmitContext value={{ isUpdating: updateGameResult.fetching, langTranslateTo: to?.code, pointRef }}>
          <GameSection
            to={to ?? {}}
            from={from ?? {}}
            numRounds={data.numRounds!}
            isHost={data.hostId === Number(userId)}
            applyChanges={applyChanges}
            setError={setError}
            startAnother={startAnother}
            maxPlayers={data.maxPlayers!}
            setStatus={setStatus}
            updatedPoint={updatedPoint}
          />
        </SubmitContext>
      </main>
    </>
  )
}













