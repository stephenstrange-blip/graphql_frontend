import { useQuery, useSubscription } from "urql"
import githubIcon from "../../assets/github-original.svg"
import { useGameStore } from "../../context/context"
import { PointsDocument, PointUpdatedDocument, type PointUpdatedSubscription } from "../../graphql/generated";
import { useEffect, useRef, useState } from "react";
import { getAllPoints } from "../../utils/utils";
import { GAME_SETTINGS, type ScoreBoard } from "../../types/types";

export function ProgressSection({ numRounds }: { numRounds: number }) {
  const gameId = useGameStore(state => state.gameId);
  const userId = sessionStorage.getItem("userId");
  const pointRef = useRef<HTMLSpanElement>(null)
  const [pointsResult] = useQuery({ query: PointsDocument, variables: { gameId } })
  // INVESTIGATE THE SUBSCRIPTION HANDLERS WHY IT IS RECEIVING DATA TWICE
  const [updatedPoint] = useSubscription({ query: PointUpdatedDocument, variables: { gameId } }, handleUpdatedPoint)
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard[]>([]);


  let error: Array<string> = [];

  // get initial scoreBoard data via query
  useEffect(() => {
    if (pointsResult.data?.points?.__typename === "QueryPointsSuccess") {
      const allPoints = getAllPoints(pointsResult.data.points.data)
      setScoreBoard(allPoints)
    }
  }, [pointsResult.data])

  // update scoreBoard on subscription payloads
  useEffect(() => {
    const newPoint = updatedPoint.data?.point ?? { points: null, userId: null };
    if (newPoint.points && Number.isInteger(newPoint.userId)) {

      setScoreBoard(prev => {
        const newArr = prev.map(item =>
          item.userId === newPoint.userId
            ? { points: item.points + (newPoint.points ?? 0), userId: newPoint.userId }
            : item
        )
        return newArr
      }
      )
    }
  }, [updatedPoint.data])


  function handleUpdatedPoint(_: PointUpdatedSubscription | undefined, newPoint: PointUpdatedSubscription) {
    // re-trigger animation on every new score update
    if (newPoint.point && pointRef.current) {
      pointRef.current.classList.remove("fleeting-point")
      void pointRef.current.offsetWidth // forces reflow
      pointRef.current.classList.add("fleeting-point")
    }
    return newPoint
  }

  if (pointsResult.data?.points?.__typename === "CustomError") {
    error.push(`Error (${pointsResult.data.points.status}): ${pointsResult.data.points.message}`)
  } else if (pointsResult.error) {
    error.push(`Error: ${pointsResult.error.message}`)
  } else if (updatedPoint.error) {
    error.push(`Error: ${updatedPoint.error.message}`)
  }

  return (
    <>
      <span className={`${error.length === 0 && 'hidden'}`}>{error.map(err => <p>{err}</p>)}</span>
      {updatedPoint.data?.point?.userId === Number(userId) && <span ref={pointRef} className="fleeting-point absolute xs:top-10 xs:right-30 lg:top-10 lg:right-70 text-[30px]">+{updatedPoint.data?.point.points}</span>}
      <div className=" scroll-smooth overflow-x-scroll flex flex-col justify-center-safe items-center-safe absolute top-0 right-0 xs:max-sm:min-w-[135px] md:min-w-[270px] xs:max-h-[50px] lg:max-h-[140px] md:p-4.5 xs:pt-1 xs:pr-1.5">
        {
          scoreBoard.map(item => (
            <ProgressDisplay key={item.userId} points={item.points} numRounds={numRounds} />
          ))
        }
      </div>
    </>
  )
}

export function ProgressDisplay({ points, numRounds }: { points: number, numRounds: number }) {
  const maxPointsPerGame = numRounds * GAME_SETTINGS.MAX_POINTS_PER_ROUND
  const percentage = Math.ceil((points / maxPointsPerGame) * 100)

  const SCORE = {
    PERFECT: "text-2xl md:h-[50%] xs:h-[40%] bg-blue-400",
    HIGH: "text-2xl md:h-[50%] xs:h-[40%] bg-blue-600",
    AVERAGE: "text-2xl md:h-[50%] xs:h-[40%] bg-blue-700",
    LOW: "text-2xl md:h-[50%] xs:h-[40%] bg-blue-950"
  }

  const divClass = percentage === 100 ? SCORE.PERFECT : (percentage >= 80 ? SCORE.HIGH : (percentage >= 50 ? SCORE.AVERAGE : SCORE.LOW))
  return (
    <div className="flex flex-row w-full md:h-[26px] xs:h-[16px] relative">
      <p className="h-full md:shrink-0 md:w-[10%] me-1.5">
        <img className="size-full" src={githubIcon} alt="#" />
      </p>
      <div className="h-full w-[90%] flex flex-row items-center-safe">
        {/* https://github.com/tailwindlabs/tailwindcss/discussions/12946 */}
        <p className={divClass} style={{ width: `${percentage}%` }}></p>
      </div>

    </div>
  )
}


