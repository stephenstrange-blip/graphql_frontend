import type { Route } from "./+types/Game"
import { useState } from "react"
import { SubmitContext, useGameStore } from "../components/context"
import { useMutation, useQuery, useSubscription } from "urql"
import { GameDocument, GameUpdatedDocument, UpdateGameDocument } from "../graphql/generated"
import type { langTranslate, Participants, updateGameSettings } from "../types/types"
import { filterParticipants, parseFormData } from "../utils/utils"
import { GameSection } from "../components/GameSection"
import { PlayerSection, OpponentSection } from "../components/ParticipantSection"

export default function GamePage(args: Route.ComponentProps) {
  const gameId = useGameStore(state => state.gameId);
  const [newGameSettings] = useSubscription({ query: GameUpdatedDocument, variables: { id: gameId } })
  const [gameQueryResult] = useQuery({ query: GameDocument, variables: { gameId: Number(gameId) } })
  const [updateGameResult, updateGame] = useMutation(UpdateGameDocument)
  const [error, setError] = useState(gameQueryResult.error?.message ? gameQueryResult.error.message : null)

  let participants: Participants = [], numRounds: number = 0, to: langTranslate = {}, from: langTranslate = {}, data;;

  if (newGameSettings.data?.gameUpdated) {
    data = newGameSettings.data.gameUpdated
    participants = data.participants || []
    numRounds = data.numRounds as number
    to = data.langTranslateTo as langTranslate
    from = data.langTranslateFrom as langTranslate
  } else if (gameQueryResult.data?.game?.__typename === "QueryGameSuccess") {
    data = gameQueryResult.data.game.data;
    participants = data.participants ?? []
    numRounds = data.numRounds as number
    to = data.translateTo as langTranslate
    from = data.translateFrom as langTranslate
  }

  const { player, opponents } = filterParticipants(participants)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)

    const formData = new FormData(e.currentTarget);
    const { numRounds: _numRounds, from: _from, to: _to } = parseFormData<updateGameSettings>(formData, { numRounds: "number", from: "number", to: "number" })

    if (_from === _to)
      return setError("Cannot translate from the same language!")

    if (numRounds === _numRounds && from === _from && to === _to)
      return // do nothing

    const payload = {
      gameId: gameId || 1,
      numRounds: _numRounds,
      langTranslateFromId: _from,
      langTranslateToId: _to,
    }

    // Triggers the subscription event in the backend
    updateGame(payload)

    if (updateGameResult.error)
      return setError("Error: " + updateGameResult.error)
    if (updateGameResult.data?.changeGameSetting?.__typename === "CustomError")
      return setError(`Error (${updateGameResult.data.changeGameSetting.status}): ${updateGameResult.data?.changeGameSetting.message}`)

  }

  return (
    <>
      <p className={`bg-red-800 text-white w-full text-center p-1.5 ${error ?? 'hidden'}`}>{error}</p>
      <main className="size-full grid grid-rows-2 grid-cols-4 [&>*]:border-1 p-[1rem] gap-6">
        <PlayerSection player={player} />
        <OpponentSection opponents={opponents} numRounds={numRounds} toCode={to.code ?? ""} fromCode={from.code ?? ""} />
        <SubmitContext value={updateGameResult.fetching}>
          <GameSection to={to} from={from} numRounds={numRounds} onSubmit={handleSubmit} />
        </SubmitContext>
      </main>
    </>
  )
}













