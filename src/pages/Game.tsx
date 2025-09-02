import type { Route } from "./+types/Game"
import { useState } from "react"
import { SubmitContext, useGameStore } from "../context/context"
import { useMutation, useQuery, useSubscription } from "urql"
import { GameDocument, GameUpdatedDocument, UpdateGameDocument } from "../graphql/generated"
import type { langTranslate, Participants, updateGameSettings } from "../types/types"
import { filterParticipants, parseFormData } from "../utils/utils"
import { GameSection } from "./sections/GameSection"
import { PlayerSection, OpponentSection } from "./sections/ParticipantSection"

export default function GamePage(args: Route.ComponentProps) {
  const gameId = useGameStore(state => state.gameId);
  const [newGameSettings] = useSubscription({ query: GameUpdatedDocument, variables: { id: gameId } })
  const [gameQueryResult] = useQuery({ query: GameDocument, variables: { gameId: Number(gameId) } })
  const [updateGameResult, updateGame] = useMutation(UpdateGameDocument)
  const [error, setError] = useState(gameQueryResult.error?.message ? gameQueryResult.error.message : null)
  const userId = sessionStorage.getItem("userId")

  let participants: Participants = [], numRounds: number = 0, to: langTranslate = {}, from: langTranslate = {}, hostId: number = 0, maxPlayers: number = 1, data;

  if (newGameSettings.data?.gameUpdated) {
    data = newGameSettings.data.gameUpdated
    participants = data.participants || []
    numRounds = data.numRounds as number
    to = data.langTranslateTo as langTranslate
    from = data.langTranslateFrom as langTranslate,
    hostId = data.hostId as number,
    maxPlayers = data.maxPlayers as number
    console.log(data.maxPlayers + " in subscription")
  } else if (gameQueryResult.data?.game?.__typename === "QueryGameSuccess") {
    data = gameQueryResult.data.game.data;
    participants = data.participants ?? []
    numRounds = data.numRounds as number
    to = data.translateTo as langTranslate
    from = data.translateFrom as langTranslate
    hostId = data.hostId as number,
    maxPlayers = data.maxPlayers as number
    console.log(data.maxPlayers + " in query")
  }

  const { player, opponents } = filterParticipants(participants)

  // This handler is for when user changes game settings prior to game
  const applyChanges: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)

    const formData = new FormData(e.currentTarget);
    const { numRounds: _numRounds, from: _from, to: _to, maxPlayers: _maxPlayers } = parseFormData<updateGameSettings>(formData, { numRounds: "number", from: "number", to: "number", maxPlayers: "number" })

    if (_from === _to)
      return setError("Cannot translate from the same language!")

    if (numRounds === _numRounds && Number(from.id) === _from && Number(to.id) === _to && maxPlayers === _maxPlayers)
      return setError("No changes detected!")

    const payload = {
      gameId: gameId || 1,
      numRounds: _numRounds,
      langTranslateFromId: _from,
      langTranslateToId: _to,
      maxPlayers: _maxPlayers
    }

    // Triggers the subscription event in the backend
    updateGame(payload).then(result => {
      if (result.error)
        return setError("Error: " + result.error)
      if (result.data?.changeGameSetting?.__typename === "CustomError")
        return setError(`Error (${result.data.changeGameSetting.status}): ${result.data?.changeGameSetting.message}`)
    })

  }
  // This handler is for when a game ends, and user wants to start another game
  const startAnother = () => {

    if (!from.id || !to.id)
      return setError("Error: There's no from and to language ID. Reload the page")

    const payload = {
      gameId: gameId || 1,
      numRounds: numRounds,
      langTranslateFromId: Number(from.id),
      langTranslateToId: Number(to.id),
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
        <OpponentSection opponents={opponents} numRounds={numRounds} toCode={to.code ?? ""} fromCode={from.code ?? ""} />
        <SubmitContext value={{ isFetching: updateGameResult.fetching, langTranslateTo: to.code }}>
          <GameSection to={to} from={from} numRounds={numRounds} isHost={hostId === Number(userId)} applyChanges={applyChanges} setError={setError} startAnother={startAnother} maxPlayers={maxPlayers} />
        </SubmitContext>
      </main>
    </>
  )
}













