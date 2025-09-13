import { useContext, useEffect, useRef, useState } from "react"
import { Form } from "react-router"
import { GAME_SETTINGS, type HorizontalNumberInputArgs, type PlayerInputArgs } from "../types/types"
import { sleep } from "../utils/utils"
import { SubmitAnswerDocument, type SubmitAnswerMutationVariables } from "../graphql/generated"
import { SubmitContext, useGameStore } from "../context/context"
import { useMutation } from "urql"

export function PlayerInput({ timer, isRoundActive, roundId, isCorrect, setIsCorrect }: PlayerInputArgs) {
  const [submitAnswerResult, submitAnswer] = useMutation(SubmitAnswerDocument)
  const [inputError, setInputError] = useState<string | null>(null)
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const gameId = useGameStore(state => state.gameId)
  const { langTranslateTo } = useContext(SubmitContext)

  const noTimeLeft = (GAME_SETTINGS.MAX_TIMER_ - timer) === 0
  const inRound = isRoundActive === "inRound"
  const putHighlight = inRound && isCorrect
  const disable = !inRound || isCorrect || submitAnswerResult.fetching || noTimeLeft

  useEffect(() => {
    if (!inRound)
      setAnswer("")

  }, [inRound])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputError(null)

    const formData = new FormData(e.currentTarget);
    const answer = formData.get("answer") as string

    if (!answer || !(answer.toString().trim()))
      return setInputError("No input detected!")

    if (!roundId) {
      sleep(4000).then(() => location.reload())
      return setInputError("No roundID detected. This is a server error. Reloading page...")
    }

    const payload: SubmitAnswerMutationVariables = {
      answer: answer,
      playerId: Number(sessionStorage.getItem("userId")),
      gameId: gameId,
      langTranslateTo: langTranslateTo,
      roundId,
    }

    await submitAnswer(payload).then(result => {
      if (result.error)
        setInputError("Error: " + result.error)

      // Throw an error if wrong answer
      if (result.data?.submitAnswer?.__typename === "CustomError")
        setInputError(`Error${result.data.submitAnswer.status}: ${result.data.submitAnswer.message}`)

      // Only disable when answer is correct
      if (result.data?.submitAnswer?.__typename === "MutationSubmitAnswerSuccess" && inRound)
        if (inputRef.current) {
          setInputError(null)
          setIsCorrect(true)
        }
    })
    return
  }

  const inputClass = {
    highlighted: "text-center text-white disabled:border-b-5 min-w-input-constraint md:text-[48px] xs:text-[24px] border-b-[2px] outline-0 border-green-600 focus:border-[5px]",
    non_highlighted: "text-center text-white disabled:border-b-5 min-w-input-constraint md:text-[48px] xs:text-[24px] border-b-[5px] outline-0"
  }

  return (
    <div>
      <Form className="text-center relative flex flex-col justify-center-safe items-center-safe text-white" onSubmit={handleSubmit} >
        <label htmlFor="answer"></label>
        <p className="absolute top-0 right-0 bg-amber-700 text-amber-100 text-[15px]">{inputError}</p>
        <input ref={inputRef}
          className={putHighlight ? inputClass.highlighted : inputClass.non_highlighted}
          disabled={disable}
          type="text"
          id="answer"
          name="answer"
          value={inRound ? answer : ''}
          autoFocus={disable}
          onChange={e => {
            setInputError(null)
            setAnswer(e.currentTarget.value)
          }}
        />
        <button type="submit" className="mt-3"><div className="p-1">Submit</div></button>
      </Form>
    </div>
  )
}

export function HorizontalNumberInput({ children, id, increment, decrement, value }: HorizontalNumberInputArgs) {
  const maxValue = id === "numRounds" ? GAME_SETTINGS.MAX_ROUNDS : GAME_SETTINGS.MAX_PLAYERS
  return (
    <>
      {/* for labels - if any */}
      {children}
      <div className="flex-row flex justify-center-safe">
        <div onClick={decrement} className={`${value <= 1 ? "pointer-events-none" : ""}`}>
          <p className="xs:p-1.5 md:p-2.5 md:pr-5 md:pl-5 cursor-pointer hover:bg-gray-300 rounded-3xl hover:text-dark">-</p>
        </div>
        <input className="text-center focus:border-0 md:max-w-fit xs:w-10 md:w-20 pl-0.5 pointer-events-none" type="text" inputMode="numeric" pattern="[0-9]*" id={id} name={id} value={value} key={value} readOnly={true} />
        <div onClick={increment} className={`${value >= maxValue ? "pointer-events-none" : ""}`}>
          <p className="xs:p-1.5 md:p-2.5 md:pr-5 md:pl-5 cursor-pointer hover:bg-gray-300 rounded-3xl hover:text-dark">+</p>
        </div>
      </div>
    </>
  )
}