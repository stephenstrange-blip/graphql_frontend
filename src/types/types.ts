// src/types.ts

import type { AddUsersMutation, GetUsersQuery, GameQuery } from "../graphql/generated";

export interface updateGameSettings {
  numRounds: number,
  from: number,
  to: number
}

export type State = { gameId: number | null }
export type Action = {
  setGameId: (gameId: State["gameId"]) => void
}

export type User = NonNullable<GetUsersQuery["users"]>[0];
export type addUser = AddUsersMutation["addUsers"]
export type Participants = NonNullable<Extract<NonNullable<GameQuery["game"]>, { __typename: "QueryGameSuccess" }>["data"]["participants"]>
export type Participant = Participants[number]
export type langTranslate = NonNullable<Extract<NonNullable<GameQuery["game"]>, { __typename: "QueryGameSuccess" }>["data"]["translateFrom"]>
// export type newUser = NonNullable<AddUsersMutation["addUsers"]>[0];