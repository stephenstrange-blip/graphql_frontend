// Make sure to use import type { xxx } from '...' instead of import { type xxx } from '...', 
// because only the former will be dropped completely and thereby not incur any issues.
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  answer?: Maybe<Scalars['String']['output']>;
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  player?: Maybe<User>;
  responseTime?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Round>;
};

export type BaseError = Error & {
  __typename?: 'BaseError';
  message?: Maybe<Scalars['String']['output']>;
};

export type CustomError = Error & {
  __typename?: 'CustomError';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type Error = {
  message?: Maybe<Scalars['String']['output']>;
};

export type GameSession = {
  __typename?: 'GameSession';
  id?: Maybe<Scalars['ID']['output']>;
  numRounds?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Participant>>;
  start?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  translateFrom?: Maybe<Language>;
  translateTo?: Maybe<Language>;
  winnerId?: Maybe<Scalars['Int']['output']>;
};

export type GameUpdated = {
  __typename?: 'GameUpdated';
  id?: Maybe<Scalars['ID']['output']>;
  langTranslateFrom?: Maybe<Language>;
  langTranslateTo?: Maybe<Language>;
  numRounds?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Participant>>;
};

export type Language = {
  __typename?: 'Language';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsers?: Maybe<User>;
  changeGameSetting?: Maybe<MutationChangeGameSettingResult>;
  createGame?: Maybe<MutationCreateGameResult>;
  joinGame?: Maybe<MutationJoinGameResult>;
};


export type MutationAddUsersArgs = {
  name: Scalars['String']['input'];
};


export type MutationChangeGameSettingArgs = {
  gameId: Scalars['Int']['input'];
  langTranslateFromId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateToId?: InputMaybe<Scalars['Int']['input']>;
  numRounds?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateGameArgs = {
  langTranslateFromId: Scalars['Int']['input'];
  langTranslateToId: Scalars['Int']['input'];
  numRounds: Scalars['Int']['input'];
  status?: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationChangeGameSettingResult = BaseError | CustomError | MutationChangeGameSettingSuccess;

export type MutationChangeGameSettingSuccess = {
  __typename?: 'MutationChangeGameSettingSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationCreateGameResult = BaseError | CustomError | MutationCreateGameSuccess;

export type MutationCreateGameSuccess = {
  __typename?: 'MutationCreateGameSuccess';
  data: GameCreated;
};

export type MutationJoinGameResult = BaseError | CustomError | MutationJoinGameSuccess;

export type MutationJoinGameSuccess = {
  __typename?: 'MutationJoinGameSuccess';
  data: GameCreated;
};

export type Participant = {
  __typename?: 'Participant';
  gameId?: Maybe<Scalars['Int']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  player?: Maybe<User>;
  playerId?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

export type PlayerJoined = {
  __typename?: 'PlayerJoined';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<QueryGameResult>;
  games?: Maybe<QueryGamesResult>;
  users?: Maybe<Array<User>>;
};


export type QueryGameArgs = {
  gameId: Scalars['Int']['input'];
};

export type QueryGameResult = BaseError | CustomError | QueryGameSuccess;

export type QueryGameSuccess = {
  __typename?: 'QueryGameSuccess';
  data: GameSession;
};

export type QueryGamesResult = BaseError | CustomError | QueryGamesSuccess;

export type QueryGamesSuccess = {
  __typename?: 'QueryGamesSuccess';
  data: Array<GameSession>;
};

export type Round = {
  __typename?: 'Round';
  answer?: Maybe<Scalars['Int']['output']>;
  gameId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Scalars['Int']['output']>;
  responses?: Maybe<Array<Answer>>;
  roundNumber?: Maybe<Scalars['Int']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  gameUpdated?: Maybe<GameUpdated>;
  playerJoined?: Maybe<PlayerJoined>;
  roundsPrepared?: Maybe<Scalars['Boolean']['output']>;
};


export type SubscriptionGameUpdatedArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  participations?: Maybe<Array<Participant>>;
};

export type GameCreated = {
  __typename?: 'gameCreated';
  gameId?: Maybe<Scalars['Int']['output']>;
  playerAdded?: Maybe<Scalars['Boolean']['output']>;
  roundsPrepared?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateGameMutationVariables = Exact<{
  langTranslateFromId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateToId?: InputMaybe<Scalars['Int']['input']>;
  numRounds?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationCreateGameSuccess', data: { __typename?: 'gameCreated', gameId?: number | null, playerAdded?: boolean | null, roundsPrepared?: boolean | null } } | null };

export type UpdateGameMutationVariables = Exact<{
  numRounds?: InputMaybe<Scalars['Int']['input']>;
  langTranslateToId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateFromId?: InputMaybe<Scalars['Int']['input']>;
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', changeGameSetting?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationChangeGameSettingSuccess', data: boolean } | null };

export type JoinGameMutationVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type JoinGameMutation = { __typename?: 'Mutation', joinGame?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationJoinGameSuccess', data: { __typename?: 'gameCreated', gameId?: number | null, playerAdded?: boolean | null, roundsPrepared?: boolean | null } } | null };

export type GameQueryVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GameQuery = { __typename?: 'Query', game?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'QueryGameSuccess', data: { __typename?: 'GameSession', id?: string | null, numRounds?: number | null, status?: number | null, translateFrom?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, translateTo?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, participants?: Array<{ __typename?: 'Participant', playerId?: number | null, score?: number | null, player?: { __typename?: 'User', name?: string | null } | null }> | null } } | null };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'QueryGamesSuccess', data: Array<{ __typename?: 'GameSession', id?: string | null, numRounds?: number | null, start?: any | null, status?: number | null, winnerId?: number | null, translateFrom?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, translateTo?: { __typename?: 'Language', code?: string | null, id?: string | null } | null }> } | null };

export type RoundsPreparedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoundsPreparedSubscription = { __typename?: 'Subscription', roundsPrepared?: boolean | null };

export type PlayerJoinedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PlayerJoinedSubscription = { __typename?: 'Subscription', playerJoined?: { __typename?: 'PlayerJoined', id?: string | null, name?: string | null, score?: number | null } | null };

export type GameUpdatedSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GameUpdatedSubscription = { __typename?: 'Subscription', gameUpdated?: { __typename?: 'GameUpdated', id?: string | null, numRounds?: number | null, langTranslateFrom?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, langTranslateTo?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, participants?: Array<{ __typename?: 'Participant', score?: number | null, playerId?: number | null, player?: { __typename?: 'User', name?: string | null } | null }> | null } | null };

export type AddUsersMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddUsersMutation = { __typename?: 'Mutation', addUsers?: { __typename?: 'User', name?: string | null, createdAt?: any | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', name?: string | null, createdAt?: any | null }> | null };


export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"2"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"langTranslateFromId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateToId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}}},{"kind":"Argument","name":{"kind":"Name","value":"numRounds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"playerAdded"}},{"kind":"Field","name":{"kind":"Name","value":"roundsPrepared"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const UpdateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"2"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGameSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateFromId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateToId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}}},{"kind":"Argument","name":{"kind":"Name","value":"numRounds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationChangeGameSettingSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGameMutation, UpdateGameMutationVariables>;
export const JoinGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"joinGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationJoinGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"playerAdded"}},{"kind":"Field","name":{"kind":"Name","value":"roundsPrepared"}}]}}]}}]}}]}}]} as unknown as DocumentNode<JoinGameMutation, JoinGameMutationVariables>;
export const GameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"game"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numRounds"}},{"kind":"Field","name":{"kind":"Name","value":"translateFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translateTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GameQuery, GameQueryVariables>;
export const GamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGamesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numRounds"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"translateFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translateTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const RoundsPreparedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"roundsPrepared"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roundsPrepared"}}]}}]} as unknown as DocumentNode<RoundsPreparedSubscription, RoundsPreparedSubscriptionVariables>;
export const PlayerJoinedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"playerJoined"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerJoined"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>;
export const GameUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"gameUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"langTranslateFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"langTranslateTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numRounds"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]}}]}}]} as unknown as DocumentNode<GameUpdatedSubscription, GameUpdatedSubscriptionVariables>;
export const AddUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddUsersMutation, AddUsersMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;