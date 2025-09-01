import type { Route } from "./+types/Home"
import Header from '../components/Header'
import { useMutation } from "urql"
import { CreateGameDocument, JoinGameDocument } from "../graphql/generated"
import { useGameStore } from "../context/context"
import { useRef, useState, type FormEventHandler, type FormEvent } from "react"
import Dialog from "../components/Dialog"

export default function Home(args: Route.ComponentProps) {
  const [createGameResult, createGame] = useMutation(CreateGameDocument)
  const [roomValue, setJoinRoomValue] = useState<string>("");
  const [joinGameResult, joinGame] = useMutation(JoinGameDocument)
  const [error, setError] = useState<string | null>(null);
  const { gameId, setGameId } = useGameStore()
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (gameId) {
    location.href = "/play"
  }

  const startGame = async () => {
    setError(null);

    await createGame({ userId: Number(localStorage.getItem("userId")) ?? 0, numRounds: 2, langTranslateFromId: 1, langTranslateToId: 2 }).then(result => {

      if (result.error)
        return setError("Error: " + result.error.message)
  
      if (result.data?.createGame?.__typename === "CustomError")
        return setError(`Error (${result.data.createGame.status}): ${result.data?.createGame.message}`)
  
      if (result.data?.createGame?.__typename === "MutationCreateGameSuccess") {
        const { gameId, roundsPrepared, playerAdded } = result.data.createGame.data;
  
        if ((gameId && gameId >= 0) && roundsPrepared && playerAdded) {
          setGameId(gameId)
          location.href = "/play"
        } else {
          console.log(gameId, roundsPrepared, playerAdded)
          return setError("Error: Some operations were unsuccessful")
        }
      }

    })

  }

  const openDialog = () => {
    setError(null)
    if (dialogRef.current) dialogRef.current.showModal()
  }

  const joinRoom: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)

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
          setGameId(gameId)
          location.href = "/play"
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
        <p className={`bg-red-800 text-white w-full text-center p-1.5 ${error ?? 'hidden'}`}>{error}</p>
        <Header />

        <main className="size-full flex flex-col justify-center-safe items-center-safe">
          <p className="text-[30px] text-[#000000]">Welcome</p>
          <div className="flex flex-row">
            <p className={`cursor-pointer rounded-[15px] pl-[5px] pr-[5px] hover:text-gray-700 hover:shadow-[0_.5rem_.5rem_rgba(0,0,0,0.25)_inset] ${createGameResult.fetching ? "pointer-events-none" : "pointer-events-auto"}`} onClick={openDialog}>Join</p> or
            <p className={`cursor-pointer rounded-[15px] pl-[5px] pr-[5px] hover:text-gray-700 hover:shadow-[0_.5rem_.5rem_rgba(0,0,0,0.25)_inset] ${createGameResult.fetching ? "pointer-events-none" : "pointer-events-auto"}`} onClick={startGame}>Start</p> a game
          </div>
        </main>
      </div>
      <Dialog ref={dialogRef} handleClick={joinRoom} setValue={setJoinRoomValue} value={roomValue} joining={joinGameResult.fetching} />
    </>
  )
}

