import { Form } from "react-router"
import type { Route } from "./+types/Game"
import { useEffect, useState, type ReactNode, useContext } from "react"
import githubIcon from "../assets/github-original.svg"
import { SubmitContext, useGameStore } from "../components/context"
import { useMutation, useQuery, useSubscription } from "urql"
import { GameDocument, GameUpdatedDocument, UpdateGameDocument } from "../graphql/generated"
import type { langTranslate, Participant, Participants, updateGameSettings } from "../types/types"
import { filterParticipants, parseFormData } from "../utils/utils"

export default function GamePage(args: Route.ComponentProps) {
  const gameId = useGameStore(state => state.gameId);
  const [newGameSettings] = useSubscription({ query: GameUpdatedDocument, variables: { id: gameId } })
  const [gameQueryResult] = useQuery({ query: GameDocument, variables: { gameId: Number(gameId) } })
  const [updateGameResult, updateGame] = useMutation(UpdateGameDocument)
  const [error, setError] = useState(gameQueryResult.error?.message ? gameQueryResult.error.message : null)

  let participants: Participants = [], numRounds: number = 0, to: langTranslate = {}, from: langTranslate = {}, data;;

  if (newGameSettings.data?.gameUpdated) {
    data = newGameSettings.data.gameUpdated
    participants = data.participants || []
    numRounds = data.numRounds as number
    to = data.langTranslateTo as langTranslate
    from = data.langTranslateFrom as langTranslate
  } else if (gameQueryResult.data?.game?.__typename === "QueryGameSuccess") {
    data = gameQueryResult.data.game.data;
    participants = data.participants ?? []
    numRounds = data.numRounds as number
    to = data.translateTo as langTranslate
    from = data.translateFrom as langTranslate
  }

  const { player, opponents } = filterParticipants(participants)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)

    const formData = new FormData(e.currentTarget);
    const { numRounds: _numRounds, from: _from, to: _to } = parseFormData<updateGameSettings>(formData, { numRounds: "number", from: "number", to: "number" })

    if (_from === _to)
      return setError("Cannot translate from the same language!")

    if (numRounds === _numRounds && from === _from && to === _to)
      return // do nothing

    const payload = {
      gameId: gameId || 1,
      numRounds: _numRounds,
      langTranslateFromId: _from,
      langTranslateToId: _to,
    }

    // Triggers the subscription event in the backend
    updateGame(payload)

    if (updateGameResult.error)
      return setError("Error: " + updateGameResult.error)
    if (updateGameResult.data?.changeGameSetting?.__typename === "CustomError")
      return setError(`Error (${updateGameResult.data.changeGameSetting.status}): ${updateGameResult.data?.changeGameSetting.message}`)

  }

  return (
    <>
      <p className={`bg-red-800 text-white w-full text-center p-1.5 ${error ?? 'hidden'}`}>{error}</p>
      <main className="size-full grid grid-rows-2 grid-cols-4 [&>*]:border-1 p-[1rem] gap-6">
        <PlayerSection player={player} />
        <OpponentSection opponents={opponents} numRounds={numRounds} toCode={to.code ?? ""} fromCode={from.code ?? ""} />
        <SubmitContext value={updateGameResult.fetching}>
          <GameSection to={to} from={from} numRounds={numRounds} onSubmit={handleSubmit} />
        </SubmitContext>
      </main>
    </>
  )
}



function PlayerSection({ player }: { player: Participant }) {
  const data: Participant = player

  return (
    <div className="col-start-1 col-span-1 p-8 h-full flex flex-col">
      <div className="flex flex-row items-center-safe pb-2.5">
        <p className="size-[56px] me-1.5">
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

function OpponentSection({ opponents, numRounds, toCode, fromCode }: { opponents: Participants, numRounds: number, toCode: string, fromCode: string }) {
  return (
    <div className="row-start-2 row-span-2 p-8 flex flex-col h-fit">
      <p className="text-center  pb-3 text-[22px] ">Best of {numRounds}</p>
      <p className="text-center text-[12px]">{`${fromCode} -> ${toCode}`}</p>
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

function GameSection({ to, from, numRounds, onSubmit }: { to: langTranslate, from: langTranslate, numRounds: number, onSubmit: React.FormEventHandler<HTMLFormElement> }) {
  return (
    <div className="col-span-3 row-span-3 relative flex justify-center-safe items-center-safe [&>*]:border-1 ">
      {/* <RoundSection /> */}
      <PreparationSection to={to} from={from} numRounds={numRounds} onSubmit={onSubmit} />
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

function PreparationSection({ to, from, numRounds, onSubmit }: { to: langTranslate, from: langTranslate, numRounds: number, onSubmit: React.FormEventHandler<HTMLFormElement> }) {
  const [value, setValue] = useState<number>(numRounds);
  const isFetching = useContext(SubmitContext)

  const langugageNames = {
    eng: "english",
    ger: "german",
    fil: "filipino",
    kor: "korean"
  }

  const languages = [
    { code: "eng", id: 0 },
    { code: "fil", id: 2 },
    { code: "ger", id: 1 },
    { code: "kor", id: 3 }
  ]

  useEffect(() => {
    setValue(numRounds)
  }, [numRounds])

  const languageWithNames = languages.map(item => ({
    code: item.code,
    id: item.id,
    name: langugageNames[item.code as keyof typeof langugageNames]
  }))

  return (
    <Form onSubmit={onSubmit}>
      <HorizontalNumberInput id="numRounds" value={value} onChange={setValue}>
        <label htmlFor="numRounds">Number of Rounds</label>
      </HorizontalNumberInput>
      <span className="flex flex-row">
        <div className="flex" >
          <label htmlFor="from">From: </label>
          <Dropdown
            initial={from}
            languages={languageWithNames}
            option="from"
          />
        </div>
        <div className="flex">
          <label htmlFor="to">To: </label>
          <Dropdown
            initial={to}
            languages={languageWithNames}
            option="to"
          />
        </div>
      </span>

      <button type="submit" disabled={!!isFetching}>{isFetching ? "Submitting..." : "Submit"}</button>
    </Form>
  )
}

function HorizontalNumberInput({ children, id, onChange, value }:
  { children?: ReactNode, id: string, value: number, onChange: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div className="flex flex-col">
      {/* for labels - if any */}
      {children}
      <div className="flex-row flex">
        <div className="left-arrow" onClick={() => onChange(v => v === 0 ? v : v - 1)}>-</div>
        <input className="text-center" type="number" id={id} name={id} value={value} key={value} readOnly />
        <div className="right-arrow" onClick={() => onChange(v => v === 10 ? v : v + 1)}>+</div>
      </div>
    </div>

  )
}

function Dropdown({ initial, languages, option }: { initial: langTranslate, option: "to" | "from", languages: Array<{ code: string, id: number, name: string }> }) {
  return (
    // To force defaultValue to update on rerenders, see the link below
    // https://stackoverflow.com/questions/30146105/react-input-defaultvalue-doesnt-update-with-state
    <select name={option} id={option} defaultValue={initial.id ?? "0"} key={initial.id ?? "0"}>
      {languages.map(language =>
        <option value={language.id} key={language.id}>{language.name}</option>
      )}
    </select>
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
        <input
          className=" min-w-input-constraint text-[48px] focus:border-none border-b-2  hover:"
          type="text"
          id="answer"
          name="answer"
          value={answer} onChange={e => setAnswer(e.currentTarget.value)}
        />
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
