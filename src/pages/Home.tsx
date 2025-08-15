import type { Route } from "./+types/Home"
import Header from '../components/Header'
import { useNavigate } from "react-router"
import { useMutation } from "urql"
import { CreateGameDocument } from "../graphql/generated"
import { useGameStore } from "../components/context"
import { useState } from "react"

export default function Home(args: Route.ComponentProps) {
  const navigate = useNavigate()
  const [createGameResult, createGame] = useMutation(CreateGameDocument)
  const setGameId = useGameStore(state => state.setGameId)
  const [error, setError] = useState<string>("");


  const handleClick = async () => {
    setError("");

    await createGame({ userId: 1, numRounds: 2, langTranslateFromId: 1, langTranslateToId: 2 })

    if (createGameResult.error)
      return setError("Error: " + createGameResult.error.message)

    if (createGameResult.data?.createGame?.__typename === "CustomError")
      return setError(`Error (${createGameResult.data.createGame.status}): ${createGameResult.data?.createGame.message}`)

    if (createGameResult.data?.createGame?.__typename === "MutationCreateGameSuccess") {
      const { gameId, roundsPrepared, playerAdded } = createGameResult.data.createGame.data;

      if (gameId && roundsPrepared && playerAdded) {
        localStorage.setItem("gameId", `${gameId}`)
        setGameId(gameId)
        navigate("/play")
      } else {
        console.log(gameId, roundsPrepared, playerAdded)
        return setError("Error: Some operations were unsuccessful")
      }
    }
  }

  return (
    <div className="bg-[#e7e7e7] flex-col h-screen w-full flex items-center gap-y-0.5 ">
      <p>{error}</p>
      <Header />

      <main className="size-full flex flex-col justify-center-safe items-center-safe">
        <p className="text-[30px] text-[#000000]">Welcome</p>

        <div className="flex flex-row">
          Let's <p className={`pl-[5px] pr-[5px] hover:text-gray-700 ${createGameResult.fetching ? "pointer-events-none" : "pointer-events-auto"}`} onClick={handleClick}> play,</p> <p>Jade</p>.
        </div>
      </main>
    </div>
  )
}

