import { useEffect, useState } from "react";
import githubIcon from "../../assets/github-original.svg"
import type { Participants, Participant } from "../../types/types"
import type { UseSubscriptionState } from "urql";
import type { PointUpdatedSubscription } from "../../graphql/generated";

export function PlayerSection({ player, updatedPoint }: { player: Participant, updatedPoint: UseSubscriptionState<PointUpdatedSubscription> }) {
  const [playerDetails, setPlayerDetails] = useState(player);

  useEffect(() => {
    const newPoint = updatedPoint.data?.point ?? { points: null, userId: null };

    // update playerDetails on subscription payloads
    if (newPoint.points && Number.isInteger(newPoint.userId))
      setPlayerDetails(prev => {
        const { score, ...others } = prev

        return prev.playerId === newPoint.userId
          ? { score: (prev.score ?? 0) + (newPoint.points ?? 0), ...others }
          : prev
      })

    // get data from initial query
    else if (player)
      setPlayerDetails(player)

  }, [updatedPoint.data, player])

  return (
    <div className=" bg-tertiary text-orange-200 xl:col-start-1 xl:col-span-1 xl:p-8 xs:p-5 xs:max-md:gap-5 h-full flex flex-col xs:flex-1/4">
      <div className="flex flex-row items-center-safe lg:pb-2.5">
        <p className="size-[56px] me-2.5">
          <img src={githubIcon} alt="" />
        </p>
        <h1 className="text-[28px]">{playerDetails.player?.name}</h1>
      </div>
      <div className="flex flex-col xl:gap-3.5 xl:justify-around xs:justify-center-safe flex-1 ">
        <div className="flex xl:flex-col md:flex-row xs:justify-between">
          <p>Score: </p>
          <p>{playerDetails.score}</p>
        </div>
        <div className="flex xl:flex-col md:flex-row xs:justify-between">
          <p>Average Typing Speed: </p>
          <p>{playerDetails.score + ' '} wpm</p>
        </div>
      </div>
    </div>
  )
}

export function OpponentSection({ opponents, numRounds, toCode, fromCode, updatedPoint }: { opponents: Participants, numRounds: number, toCode: string, fromCode: string, updatedPoint: UseSubscriptionState<PointUpdatedSubscription> }) {
  const [scoreBoard, setScoreBoard] = useState(opponents);

  useEffect(() => {
    const newPoint = updatedPoint.data?.point ?? { points: null, userId: null };
    
    // update scoreBoard on subscription payloads
    if (newPoint.points && Number.isInteger(newPoint.userId)) {

      setScoreBoard(prev => {
        const newArr = prev.map(item => {
          const { score, ...others } = item

          return item.playerId === newPoint.userId
            ? { score: (item.score ?? 0) + (newPoint.points ?? 0), ...others }
            : item
        })

        return newArr
      }
      )
    }

    // get data from initial query
    else if (opponents)
      setScoreBoard(opponents)

  }, [updatedPoint.data, opponents])

  return (
    <div className="bg-secondary  xl:row-start-2 xl:row-span-2 xl:p-8 xs:p-5 flex flex-col h-fit">
      <p className="text-center text-[22px] ">{numRounds} Rounds</p>
      <p className="text-center text-[12px] pb-2">{`${fromCode} -> ${toCode}`}</p>
      <div className="flex flex-col xl:gap-3.5 md:scroll-auto text-[14px]">
        <div className="flex flex-row xs:justify-between text-center">
          <p>Name </p>
          <p>Score: </p>
          <p className="">ATS</p>
        </div>
        {scoreBoard.map((opponent, index) => {
          return (
            <div key={index} className="flex flex-row xs:justify-between text-center ">
              <p>{opponent.player?.name}</p>
              <p>{opponent.score}</p>
              <p>{opponent.score} wpm</p>
            </div>
          )}
        )}
      </div>
    </div>
  )
}