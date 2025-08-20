import type { Route } from "./+types/Home"
import Header from '../components/Header'
import { useNavigate } from "react-router"
import { useMutation } from "urql"
import { CreateGameDocument, JoinGameDocument } from "../graphql/generated"
import { useGameStore } from "../components/context"
import { useRef, useState, type FormEventHandler, type FormEvent } from "react"
import Dialog from "../components/Dialog"

export default function Home(args: Route.ComponentProps) {
  const navigate = useNavigate()
  const [createGameResult, createGame] = useMutation(CreateGameDocument)
  const [roomValue, setJoinRoomValue] = useState<string>("");
  const [joinGameResult, joinGame] = useMutation(JoinGameDocument)
  const [error, setError] = useState<string>("");
  const setGameId = useGameStore(state => state.setGameId)
  const dialogRef = useRef<HTMLDialogElement>(null);


  const startGame = async () => {
    setError("");

    await createGame({ userId: Number(localStorage.getItem("userId")) ?? 0, numRounds: 2, langTranslateFromId: 1, langTranslateToId: 2 })

    if (createGameResult.error)
      return setError("Error: " + createGameResult.error.message)

    if (createGameResult.data?.createGame?.__typename === "CustomError")
      return setError(`Error (${createGameResult.data.createGame.status}): ${createGameResult.data?.createGame.message}`)

    if (createGameResult.data?.createGame?.__typename === "MutationCreateGameSuccess") {
      const { gameId, roundsPrepared, playerAdded } = createGameResult.data.createGame.data;

      if (gameId && roundsPrepared && playerAdded) {
        localStorage.setItem("userId", "0")
        setGameId(gameId)
        navigate("/play")
      } else {
        console.log(gameId, roundsPrepared, playerAdded)
        return setError("Error: Some operations were unsuccessful")
      }
    }
  }

  const openDialog = () => {
    setError("")
    if (dialogRef.current) dialogRef.current.showModal()
  }

  const joinRoom: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")

    const gameId = new FormData(e.currentTarget).get("gameId")

    joinGame({ gameId: Number(gameId), userId: Number(localStorage.getItem("userId")) ?? 0 }).then(result => {

      if (result.error)
        setError("Error: " + result.error.message)

      if (result.data?.joinGame?.__typename === "CustomError")
        setError(`Error (${result.data.joinGame.status}): ${result.data?.joinGame.message}`)

      console.log(result)
      if (result.data?.joinGame?.__typename === "MutationJoinGameSuccess") {
        const { gameId, roundsPrepared, playerAdded } = result.data.joinGame.data;

        if (gameId && roundsPrepared && playerAdded) {
          localStorage.setItem("userId", "2")
          setGameId(gameId)
          navigate("/play")
        } else {
          console.log(gameId, roundsPrepared, playerAdded)
          setError("Error: Cannot join game")
        }
      }
    })
    setJoinRoomValue("")
    return dialogRef!.current!.close()

  }

  return (
    <>
      <div className="bg-[#e7e7e7] flex-col h-screen w-full flex items-center gap-y-0.5 ">
        <p>{error}</p>
        <Header />

        <main className="size-full flex flex-col justify-center-safe items-center-safe">
          <p className="text-[30px] text-[#000000]">Welcome</p>
          <p>A quick tutorial on how to play the game</p>
          <div className="flex flex-row">
            <p className={`pl-[5px] pr-[5px] hover:text-gray-700 ${createGameResult.fetching ? "pointer-events-none" : "pointer-events-auto"}`} onClick={openDialog}>Join</p> or
            <p className={`pl-[5px] pr-[5px] hover:text-gray-700 ${createGameResult.fetching ? "pointer-events-none" : "pointer-events-auto"}`} onClick={startGame}>Start</p> a game
          </div>
        </main>
      </div>
      <Dialog ref={dialogRef} handleClick={joinRoom} setValue={setJoinRoomValue} value={roomValue} joining={joinGameResult.fetching} />
    </>
  )
}

