import githubIcon from "../../assets/github-original.svg"
import type { Participants, Participant } from "../../types/types"

export function PlayerSection({ player }: { player: Participant }) {
  const data: Participant = player

  return (
    <div className=" bg-tertiary text-orange-200 xl:col-start-1 xl:col-span-1 xl:p-8 xs:p-5 xs:max-md:gap-5 h-full flex flex-col xs:flex-1/4">
      <div className="flex flex-row items-center-safe lg:pb-2.5">
        <p className="size-[56px] me-2.5">
          <img src={githubIcon} alt="" />
        </p>
        <h1 className="text-[28px]">{data.player?.name}</h1>
      </div>
      <div className="flex flex-col xl:gap-3.5 xl:justify-around xs:justify-center-safe flex-1 ">
        <div className="flex xl:flex-col md:flex-row xs:justify-between">
          <p>Wins: </p>
          <p>{data.score}</p>
        </div>
        <div className="flex xl:flex-col md:flex-row xs:justify-between">
          <p>Average Typing Speed: </p>
          <p>{data.score + ' '} wpm</p>
        </div>
      </div>
    </div>
  )
}

export function OpponentSection({ opponents, numRounds, toCode, fromCode }: { opponents: Participants, numRounds: number, toCode: string, fromCode: string }) {
  return (
    <div className="bg-secondary  xl:row-start-2 xl:row-span-2 xl:p-8 xs:p-5 flex flex-col h-fit">
      <p className="text-center text-[22px] ">Best of {numRounds}</p>
      <p className="text-center text-[12px] pb-2">{`${fromCode} -> ${toCode}`}</p>
      <div className="flex flex-col xl:gap-3.5 md:scroll-auto text-[14px]">
        <div className="flex flex-row xs:justify-between text-center">
          <p>Name </p>
          <p>Wins </p>
          <p className="md: wi">ATS</p>
        </div>
        {opponents.map((opponent, index) => (
          <div key={index} className="flex flex-row xs:justify-between text-center ">
            <p>{opponent.player?.name}</p>
            <p>{opponent.score}</p>
            <p>{opponent.score} wpm</p>
          </div>
        ))}
      </div>
    </div>
  )
}