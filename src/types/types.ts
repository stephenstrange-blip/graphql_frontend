// src/types.ts

import type { JSX } from "react";
import type { AddUsersMutation, GetUsersQuery, GameQuery, RoundSubscription } from "../graphql/generated";

export interface updateGameSettings {
  numRounds: number,
  from: number,
  to: number
}

export interface GameDisplay {
  waiting: JSX.Element,
  started: JSX.Element,
  finished: JSX.Element
}

export type State = { gameId: number | null, status: keyof GameDisplay }
export type Action = {
  setGameId: (gameId: State["gameId"]) => void,
  setStatus: (status: State["status"]) => void
  reset: () => void
}

export type RoundPayload = Extract<NonNullable<RoundSubscription["round"]>, { __typename: "SubscriptionRoundSuccess" }>["data"]
export type RoundPhase = "idle" | "preCountDown" | "inRound" | "finished" | "exit"
export type User = NonNullable<GetUsersQuery["users"]>[0];
export type addUser = AddUsersMutation["addUsers"]
export type Participants = NonNullable<Extract<NonNullable<GameQuery["game"]>, { __typename: "QueryGameSuccess" }>["data"]["participants"]>
export type Participant = Participants[number]
export type langTranslate = NonNullable<Extract<NonNullable<GameQuery["game"]>, { __typename: "QueryGameSuccess" }>["data"]["translateFrom"]>
// export type newUser = NonNullable<AddUsersMutation["addUsers"]>[0];