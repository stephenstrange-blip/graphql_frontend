import { Form } from "react-router"
import type { Route } from "./+types/Game"
import { useState } from "react"
import githubIcon from "../assets/github-original.svg"

export default function GamePage(args: Route.ComponentProps) {
  console.log("I am GamePage and here is my args ", args)
  return (
    <main className="size-full grid grid-rows-2 grid-cols-4 [&>*]:border-1 p-[1rem] gap-6">
      <PlayerSection />
      <OpponentSection />
      <GameSection />
    </main>
  )
}

// GET THE DATA SHAPE FROM GRAPHQL CODEGEN
function PlayerSection() {
  const data = {
    rank: "Diamond",
    wins: 2,
    speed: 64,
    username: "Player 1"
  }
  return (
    <div className="col-start-1 col-span-1 p-8 h-full flex flex-col">
      <div className="flex flex-row items-center-safe pb-2.5">
        <p className="size-[56px] me-1.5">
          <img src={githubIcon} alt="" />
        </p>
        <h1 className="text-[28px]">{data.username}</h1>
      </div>
      <div className="flex flex-col gap-3.5 justify-around flex-1 ">
        <div className="flex flex-col">
          <p>Rank: </p>
          <p>{data.rank}</p>
        </div>
        <div className="flex flex-col">
          <p>Wins: </p>
          <p>{data.wins}</p>
        </div>
        <div className="flex flex-col">
          <p>Average Typing Speed: </p>
          <p>{data.speed + ' '} wpm</p>
        </div>
      </div>
    </div>
  )
}

function OpponentSection() {
  const data = {
    numRounds: 7,
    players: [
      { username: "Player 2", wins: 2, speed: 63 },
      { username: "Player 3", wins: 2, speed: 63 }
    ]
  }
  return (
    <div className="row-start-2 row-span-2 p-8 flex flex-col h-fit">
      <p className="text-center  pb-3 text-[22px] ">Best of {data.numRounds}</p>
      <div className="flex flex-col gap-3.5 text-[14px]">
        <div className="flex flex-col text-center">
          <p>{data.players[0].username}</p>
          <p>Wins: {data.players[0].wins}</p>
          <p>Avg. Typing Speed: {data.players[0].speed} wpm</p>
        </div>
        <div className="flex flex-col text-center">
          <p>{data.players[1].username}</p>
          <p>Wins: {data.players[1].wins}</p>
          <p>Avg. Typing Speed: {data.players[1].speed} wpm</p>
        </div>
      </div>
    </div>
  )
}

function GameSection() {
  return (
    <div className="col-span-3 row-span-3 relative flex justify-center-safe items-center-safe [&>*]:border-1 ">
      <RoundSection />
      <ProgressSection />
    </div>
  )
}

function ProgressSection() {
  return (
    <div className=" flex flex-col justify-center-safe items-center-safe absolute top-0 right-0 min-w-[270px] min-h-[80px] p-4.5">
      <ProgressDisplay />
    </div>
  )
}

function ProgressDisplay() {
  return (
    <div className="flex flex-row w-full h-[26px] items">
      <p className="h-full w-[10%] me-1.5">
        <img className="size-full" src={githubIcon} alt="#" />
      </p>
      <div className="h-full w-[90%] flex flex-row items-center-safe">
        {/* Make its width dynamic */}
        <p className=" border-b-2 w-[100%] h-[50%] bg-blue-950"></p>
      </div>
    </div>
  )
}

function RoundSection() {
  return (
    <div className="flex flex-col justify-around w-full h-[70%]">
      <span className="flex flex-col border-1 items-center-safe h-[50%] justify-around">
        <Countdown />
        <span>
          <p className="text-center">Last Round!</p>
          <p className="text-[48px]">Air Conditioner</p>
        </span>
      </span>
      <PlayerInput />
    </div>
  )
}

function PlayerInput() {
  const [answer, setAnswer] = useState('')
  return (
    <div>
      <Form className="text-center">
        <label htmlFor="answer"></label>
        {/* TODO: REMOVE BORDER WHEN ACTIVE */}
        <input className=" min-w-input-constraint text-[48px] focus:border-none border-b-2  hover:" type="text" id="answer" name="answer" value={answer} onChange={e => setAnswer(e.currentTarget.value)} />
      </Form>
    </div>
  )
}

function Countdown() {
  return (
    <span className="flex flex-row">
      <p>3</p>
      <p>2</p>
      <p>1</p>
      <p>Go!!!</p>
    </span>
  )
}

