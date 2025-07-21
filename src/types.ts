// src/types.ts

import type { GetUsersQuery } from "./graphql/generated";

export type User = NonNullable<GetUsersQuery["users"]>[0];
export type Message = NonNullable<User["messages"]>[0];