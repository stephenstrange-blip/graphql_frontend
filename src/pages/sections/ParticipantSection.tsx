import githubIcon from "../../assets/github-original.svg"
import type { Participants, Participant } from "../../types/types"

export function PlayerSection({ player }: { player: Participant }) {
  const data: Participant = player

  return (
    <div className="col-start-1 col-span-1 p-8 h-full flex flex-col">
      <div className="flex flex-row items-center-safe pb-2.5">
        <p className="size-[56px] me-2.5">
          <img src={githubIcon} alt="" />
        </p>
        <h1 className="text-[28px]">{data.player?.name}</h1>
      </div>
      <div className="flex flex-col gap-3.5 justify-around flex-1 ">
        <div className="flex flex-col">
          <p>Wins: </p>
          <p>{data.score}</p>
        </div>
        <div className="flex flex-col">
          <p>Average Typing Speed: </p>
          <p>{data.score + ' '} wpm</p>
        </div>
      </div>
    </div>
  )
}

export function OpponentSection({ opponents, numRounds, toCode, fromCode }: { opponents: Participants, numRounds: number, toCode: string, fromCode: string }) {
  return (
    <div className="row-start-2 row-span-2 p-8 flex flex-col h-fit">
      <p className="text-center text-[22px] ">Best of {numRounds}</p>
      <p className="text-center text-[12px] pb-2">{`${fromCode} -> ${toCode}`}</p>
      <div className="flex flex-col gap-3.5 text-[14px]">
        {opponents.map((opponent, index) => (
          <div key={index} className="flex flex-col text-center">
            <p>{opponent.player?.name}</p>
            <p>Wins: {opponent.score}</p>
            <p>Avg. Typing Speed: {opponent.score} wpm</p>
          </div>
        ))}
      </div>
    </div>
  )
}