import { useContext, useRef, useState} from "react"
import { Form } from "react-router"
import type { HorizontalNumberInputArgs, PlayerInputArgs } from "../types/types"
import { sleep } from "../utils/utils"
import { SubmitAnswerDocument, type SubmitAnswerMutationVariables } from "../graphql/generated"
import { SubmitContext, useGameStore } from "../context/context"
import { useMutation } from "urql"

export function PlayerInput({ isRoundActive, roundId, isCorrect, setIsCorrect }: PlayerInputArgs) {
  const [submitAnswerResult, submitAnswer] = useMutation(SubmitAnswerDocument)
  const [inputError, setInputError] = useState<string | null>(null)
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const gameId = useGameStore(state => state.gameId)
  const { langTranslateTo } = useContext(SubmitContext)

  const inRound = isRoundActive === "inRound"
  const putHighlight = inRound && isCorrect
  const disable = !inRound || isCorrect || submitAnswerResult.fetching

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
      playerId: Number(localStorage.getItem("userId")) ?? 0,
      gameId: gameId ?? 0,
      langTranslateTo: langTranslateTo ?? "eng",
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

  return (
    <div>
      <Form className="text-center relative" onSubmit={handleSubmit} >
        <label htmlFor="answer"></label>
        <p className="absolute top-0 right-0 bg-amber-700 text-amber-100 text-[15px]">{inputError}</p>
        <input ref={inputRef}
          className={" disabled:border-b-1 min-w-input-constraint text-[48px] focus:border-b-gray-200 border-b-2 outline-0 " + (putHighlight ? "border-green-600 focus:border-green-600" : "")}
          disabled={disable}
          type="text"
          id="answer"
          name="answer"
          value={inRound ? answer : ''}
          onChange={e => {
            setInputError(null)
            setAnswer(e.currentTarget.value)
          }}
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

export function HorizontalNumberInput({ children, id, onChange, value }: HorizontalNumberInputArgs) {

  const increment = () => {
    onChange(settings => {
      const { numRounds, ...others } = settings;
      return { numRounds: numRounds < 10 ? numRounds + 1 : numRounds, ...others }
    })
  }

  const decrement = () => {
    onChange(settings => {
      const { numRounds, ...others } = settings;
      return { numRounds: numRounds > 1 ? numRounds - 1: numRounds, ...others }
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* for labels - if any */}
      {children}
      <div className="flex-row flex">
        <div onClick={decrement} className={`${value <= 1 ? "pointer-events-none": ""}`}> 
          <p  className="p-2.5 pr-5 pl-5 cursor-pointer hover:bg-gray-300 rounded-3xl">-</p>
        </div>
        <input className="text-center focus:border-0 max-w-fit w-20 pl-0.5" type="number" id={id} name={id} value={value} key={value} readOnly />
        <div onClick={increment} className={`${value >= 10 ? "pointer-events-none": ""}`}>
          <p className="p-2.5 pr-5 pl-5 cursor-pointer hover:bg-gray-300 rounded-3xl">+</p>
        </div>
      </div>
    </div>
  )
}