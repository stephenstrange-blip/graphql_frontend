import type { Route } from "./+types/Game"
import { useEffect, useState } from "react"
import { SubmitContext, useGameStore } from "../context/context"
import { useMutation, useQuery, useSubscription } from "urql"
import { GameDocument, GameStartedDocument, GameUpdatedDocument, UpdateGameDocument, type GameSession, type GameStartedSubscription, type GameUpdated, type GameUpdatedSubscription } from "../graphql/generated"
import type { GamePageData, updateGameSettings } from "../types/types"
import { filterParticipants, parseFormData } from "../utils/utils"
import { GameSection } from "./sections/GameSection"
import { PlayerSection, OpponentSection } from "./sections/ParticipantSection"

export default function GamePage(args: Route.ComponentProps) {
  const gameId = useGameStore(state => state.gameId);
  const setStatus = useGameStore(state => state.setStatus)
  const [newGameSettings] = useSubscription({ query: GameUpdatedDocument, variables: { id: gameId } })
  const [gameQueryResult] = useQuery({ query: GameDocument, variables: { gameId: Number(gameId) } })
  const [updateGameResult, updateGame] = useMutation(UpdateGameDocument)
  const [error, setError] = useState(gameQueryResult.error?.message ? gameQueryResult.error.message : null)
  let data: GamePageData = {}

  // Get data from query(initial) or subscription(latest)
  if (newGameSettings.data?.gameUpdated) {
    data = newGameSettings.data.gameUpdated
  } else if (gameQueryResult.data?.game?.__typename === "QueryGameSuccess") {
    data = gameQueryResult.data.game.data;
  }

  // initial data has slightly different properties from updated data
  const from = data.translateFrom ?? data.langTranslateFrom
  const to = data.translateTo ?? data.langTranslateTo

  // player details, host or not, is displayed in a different component to opponents
  const { player, opponents } = filterParticipants(data.participants ?? [])

  const userId = sessionStorage.getItem("userId")
  const isHost = data.hostId === Number(userId)
  const [gameStarted] = useSubscription({ query: GameStartedDocument, variables: { gameId, userId: Number(sessionStorage.getItem("userId")) } })

  useEffect(() => {
    const payload = gameStarted.data

    // update non-host participants to game status changes
    if (!isHost && payload && payload.gameStarted?.__typename === "SubscriptionGameStartedSuccess" && payload.gameStarted.data)
      setStatus("started")

    else if (!isHost && payload && payload.gameStarted?.__typename === "SubscriptionGameStartedSuccess" && !(payload.gameStarted.data))
      setStatus("waiting")

  }, [isHost, gameStarted.data])


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

  return (
    <>
      <p className={`bg-red-800 text-white w-full text-center p-1.5 ${error ?? 'hidden'}`}>{error}</p>
      <main className="size-full grid grid-rows-2 grid-cols-5 [&>*]:border-1 p-[1rem] gap-4">
        <PlayerSection player={player} />
        <OpponentSection opponents={opponents} numRounds={data.numRounds!} toCode={to?.code ?? ""} fromCode={from?.code ?? ""} />
        <SubmitContext value={{ isFetching: updateGameResult.fetching, langTranslateTo: to?.code }}>
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
          />
        </SubmitContext>
      </main>
    </>
  )
}













