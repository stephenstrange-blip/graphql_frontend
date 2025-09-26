import type { JSX, ReactNode } from "react";
import type { AddUsersMutation, GetUsersQuery, GameQuery, RoundSubscription, GameSession, GameUpdated, PointUpdatedSubscription } from "../graphql/generated";
import type { UseSubscriptionState } from "urql";

export const GAME_SETTINGS = {
  // This is set for all GAMES
  // meaning hosts cannot extend up/down to the limit below
  MAX_PLAYERS: 6,
  MIN_PLAYERS: 1,
  MAX_ROUNDS: 10,
  MIN_ROUNDS: 1,
  MAX_POINTS_PER_ROUND: 2,
  MAX_TIMER_: 10,
} as const

export const langugageNames = {
  eng: "english",
  ger: "german",
  fil: "filipino",
  kor: "korean"
} as const

export const languages = [
  { code: "eng", id: 0 },
  { code: "fil", id: 2 },
  { code: "ger", id: 1 },
  { code: "kor", id: 3 }
] as const

export const languageWithNames = languages.map(item => ({
  code: item.code,
  id: item.id,
  name: langugageNames[item.code as keyof typeof langugageNames]
})) 

export interface updateGameSettings {
  numRounds: number,
  from: number,
  to: number,
  maxPlayers: number
}

export interface GameDisplay {
  waiting: JSX.Element,
  started: JSX.Element,
  finished: JSX.Element,
}
export interface ScoreBoard { points: number; userId: number | null | undefined; }

export type State = { gameId: number | null, status: keyof GameDisplay }
export type Action = {
  setGameId: (gameId: State["gameId"]) => void,
  setStatus: (status: State["status"]) => void
  reset: () => void
}

export type DropdownArgs = {
  initialId: string | null | undefined,
  option: "to" | "from",
  languages: Array<{ code: string, id: number, name: string }>,
  setValue: React.Dispatch<React.SetStateAction<SettingsArgs>>
}

export type HorizontalNumberInputArgs = {
  children?: ReactNode,
  id: string,
  value: number,
  decrement: () => void,
  increment: () => void,
}

export type SettingSectionArgs = {
  to: langTranslate,
  from: langTranslate,
  numRounds: number,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  maxPlayers: number,
}

export type SettingsArgs = { to: string | null | undefined; from: string | null | undefined; numRounds: number; maxPlayers: number }

export interface PlayerInputArgs {
  isRoundActive: RoundPhase,
  roundId: number | null | undefined,
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
  isCorrect: boolean,
  timer: number
}

export type GameSectionArgs = {
  to: langTranslate,
  from: langTranslate,
  numRounds: number,
  maxPlayers: number,
  isHost: boolean,
  applyChanges: React.FormEventHandler<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  startAnother: () => void,
  setStatus: (status: State["status"]) => void
  updatedPoint: UseSubscriptionState<PointUpdatedSubscription>
}
export type GamePageData = (GameSession | GameUpdated) & Pick<GameSession, "translateFrom" | "translateTo"> & Pick<GameUpdated, "langTranslateFrom" | "langTranslateTo">
export type RoundPayload = Extract<NonNullable<RoundSubscription["round"]>, { __typename: "SubscriptionRoundSuccess" }>["data"]
export type RoundPhase = "idle" | "preCountDown" | "inRound" | "finished" | "exit"
export type User = NonNullable<GetUsersQuery["users"]>[0];
export type addUser = AddUsersMutation["addUsers"]
export type Participants = NonNullable<Extract<NonNullable<GameQuery["game"]>, { __typename: "QueryGameSuccess" }>["data"]["participants"]>
export type Participant = Participants[number]
export type langTranslate = NonNullable<Extract<NonNullable<GameQuery["game"]>, { __typename: "QueryGameSuccess" }>["data"]["translateFrom"]>



