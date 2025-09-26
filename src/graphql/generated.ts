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
  Date: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  answer?: Maybe<Scalars['String']['output']>;
  answeredAt?: Maybe<Scalars['Date']['output']>;
  player?: Maybe<Participant>;
  points?: Maybe<Scalars['Int']['output']>;
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
  hostId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxPlayers?: Maybe<Scalars['Int']['output']>;
  numRounds?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Participant>>;
  start?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  translateFrom?: Maybe<Language>;
  translateTo?: Maybe<Language>;
  winnerId?: Maybe<Scalars['Int']['output']>;
};

export type GameUpdated = {
  __typename?: 'GameUpdated';
  hostId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  langTranslateFrom?: Maybe<Language>;
  langTranslateTo?: Maybe<Language>;
  maxPlayers?: Maybe<Scalars['Int']['output']>;
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
  exitGame?: Maybe<MutationExitGameResult>;
  joinGame?: Maybe<MutationJoinGameResult>;
  startRound?: Maybe<MutationStartRoundResult>;
  submitAnswer?: Maybe<MutationSubmitAnswerResult>;
};


export type MutationAddUsersArgs = {
  name: Scalars['String']['input'];
};


export type MutationChangeGameSettingArgs = {
  gameId: Scalars['Int']['input'];
  langTranslateFromId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateToId?: InputMaybe<Scalars['Int']['input']>;
  maxPlayers?: InputMaybe<Scalars['Int']['input']>;
  numRounds?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateGameArgs = {
  langTranslateFromId: Scalars['Int']['input'];
  langTranslateToId: Scalars['Int']['input'];
  maxPlayers?: Scalars['Int']['input'];
  numRounds: Scalars['Int']['input'];
  status?: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationExitGameArgs = {
  gameId: Scalars['Int']['input'];
  isHost: Scalars['Boolean']['input'];
  playerId: Scalars['Int']['input'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationStartRoundArgs = {
  gameId: Scalars['Int']['input'];
  hostId: Scalars['Int']['input'];
  langTranslateFrom: Scalars['String']['input'];
  langTranslateTo: Scalars['String']['input'];
};


export type MutationSubmitAnswerArgs = {
  answer: Scalars['String']['input'];
  gameId: Scalars['Int']['input'];
  langTranslateTo: Scalars['String']['input'];
  playerId: Scalars['Int']['input'];
  roundId: Scalars['Int']['input'];
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

export type MutationExitGameResult = BaseError | CustomError | MutationExitGameSuccess;

export type MutationExitGameSuccess = {
  __typename?: 'MutationExitGameSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationJoinGameResult = BaseError | CustomError | MutationJoinGameSuccess;

export type MutationJoinGameSuccess = {
  __typename?: 'MutationJoinGameSuccess';
  data: GameCreated;
};

export type MutationStartRoundResult = BaseError | CustomError | MutationStartRoundSuccess;

export type MutationStartRoundSuccess = {
  __typename?: 'MutationStartRoundSuccess';
  data: Round;
};

export type MutationSubmitAnswerResult = BaseError | CustomError | MutationSubmitAnswerSuccess;

export type MutationSubmitAnswerSuccess = {
  __typename?: 'MutationSubmitAnswerSuccess';
  data: Scalars['Boolean']['output'];
};

export type Participant = {
  __typename?: 'Participant';
  answers?: Maybe<Array<Answer>>;
  gameId?: Maybe<Scalars['Int']['output']>;
  joinedAt?: Maybe<Scalars['Date']['output']>;
  player?: Maybe<User>;
  playerId?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

export type ParticipantsPayload = {
  __typename?: 'ParticipantsPayload';
  isJoining?: Maybe<Scalars['Boolean']['output']>;
  player?: Maybe<Player>;
  playerId?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

export type PointPayload = {
  __typename?: 'PointPayload';
  points?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<QueryGameResult>;
  games?: Maybe<QueryGamesResult>;
  points?: Maybe<QueryPointsResult>;
  users?: Maybe<Array<User>>;
};


export type QueryGameArgs = {
  gameId: Scalars['Int']['input'];
};


export type QueryPointsArgs = {
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

export type QueryPointsResult = BaseError | CustomError | QueryPointsSuccess;

export type QueryPointsSuccess = {
  __typename?: 'QueryPointsSuccess';
  data: Array<Participant>;
};

export type Round = {
  __typename?: 'Round';
  answers?: Maybe<Array<Answer>>;
  gameId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  roundNumber?: Maybe<Scalars['Int']['output']>;
  startTime?: Maybe<Scalars['Date']['output']>;
  wordTranslateFromId?: Maybe<Scalars['Int']['output']>;
  wordTranslateToId?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  gameStatusUpdated?: Maybe<SubscriptionGameStatusUpdatedResult>;
  gameUpdated?: Maybe<GameUpdated>;
  phase?: Maybe<SubscriptionPhaseResult>;
  playerJoined?: Maybe<Array<ParticipantsPayload>>;
  point?: Maybe<PointPayload>;
  postCountDown?: Maybe<SubscriptionPostCountDownResult>;
  preCountDown?: Maybe<SubscriptionPreCountDownResult>;
  round?: Maybe<SubscriptionRoundResult>;
  roundsPrepared?: Maybe<Scalars['Boolean']['output']>;
  timer?: Maybe<SubscriptionTimerResult>;
};


export type SubscriptionGameStatusUpdatedArgs = {
  gameId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type SubscriptionGameUpdatedArgs = {
  gameId: Scalars['Int']['input'];
};


export type SubscriptionPhaseArgs = {
  gameId: Scalars['Int']['input'];
};


export type SubscriptionPlayerJoinedArgs = {
  gameId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type SubscriptionPointArgs = {
  gameId: Scalars['Int']['input'];
};


export type SubscriptionPostCountDownArgs = {
  gameId: Scalars['Int']['input'];
};


export type SubscriptionPreCountDownArgs = {
  gameId: Scalars['Int']['input'];
};


export type SubscriptionRoundArgs = {
  gameId: Scalars['Int']['input'];
};


export type SubscriptionTimerArgs = {
  gameId: Scalars['Int']['input'];
};

export type SubscriptionGameStatusUpdatedResult = BaseError | CustomError | SubscriptionGameStatusUpdatedSuccess;

export type SubscriptionGameStatusUpdatedSuccess = {
  __typename?: 'SubscriptionGameStatusUpdatedSuccess';
  data: Scalars['String']['output'];
};

export type SubscriptionPhaseResult = BaseError | CustomError | SubscriptionPhaseSuccess;

export type SubscriptionPhaseSuccess = {
  __typename?: 'SubscriptionPhaseSuccess';
  data: RoundPhase;
};

export type SubscriptionPostCountDownResult = BaseError | CustomError | SubscriptionPostCountDownSuccess;

export type SubscriptionPostCountDownSuccess = {
  __typename?: 'SubscriptionPostCountDownSuccess';
  data: Scalars['Int']['output'];
};

export type SubscriptionPreCountDownResult = BaseError | CustomError | SubscriptionPreCountDownSuccess;

export type SubscriptionPreCountDownSuccess = {
  __typename?: 'SubscriptionPreCountDownSuccess';
  data: Scalars['Int']['output'];
};

export type SubscriptionRoundResult = BaseError | CustomError | SubscriptionRoundSuccess;

export type SubscriptionRoundSuccess = {
  __typename?: 'SubscriptionRoundSuccess';
  data: RoundPayload;
};

export type SubscriptionTimerResult = BaseError | CustomError | SubscriptionTimerSuccess;

export type SubscriptionTimerSuccess = {
  __typename?: 'SubscriptionTimerSuccess';
  data: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
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

export type Player = {
  __typename?: 'player';
  name?: Maybe<Scalars['String']['output']>;
};

export type RoundPayload = {
  __typename?: 'roundPayload';
  end?: Maybe<Scalars['Date']['output']>;
  gameId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  roundNumber?: Maybe<Scalars['Int']['output']>;
  start?: Maybe<Scalars['Date']['output']>;
  wordTranslateFrom?: Maybe<Scalars['String']['output']>;
  wordTranslateFromId?: Maybe<Scalars['Int']['output']>;
  wordTranslateTo?: Maybe<Scalars['String']['output']>;
  wordTranslateToId?: Maybe<Scalars['Int']['output']>;
};

export enum RoundPhase {
  Exit = 'exit',
  Finished = 'finished',
  Idle = 'idle',
  InRound = 'inRound',
  PreCountDown = 'preCountDown'
}

export type CreateGameMutationVariables = Exact<{
  langTranslateFromId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateToId?: InputMaybe<Scalars['Int']['input']>;
  numRounds?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationCreateGameSuccess', data: { __typename?: 'gameCreated', gameId?: number | null, playerAdded?: boolean | null, roundsPrepared?: boolean | null } } | null };

export type UpdateGameMutationVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateFromId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateToId?: InputMaybe<Scalars['Int']['input']>;
  numRounds?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  maxPlayers?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', changeGameSetting?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationChangeGameSettingSuccess', data: boolean } | null };

export type JoinGameMutationVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type JoinGameMutation = { __typename?: 'Mutation', joinGame?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationJoinGameSuccess', data: { __typename?: 'gameCreated', gameId?: number | null, playerAdded?: boolean | null, roundsPrepared?: boolean | null } } | null };

export type ExitGameMutationVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  hostId?: InputMaybe<Scalars['Int']['input']>;
  isHost?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ExitGameMutation = { __typename?: 'Mutation', exitGame?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationExitGameSuccess', data: boolean } | null };

export type GameQueryVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GameQuery = { __typename?: 'Query', game?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'QueryGameSuccess', data: { __typename?: 'GameSession', id?: string | null, numRounds?: number | null, status?: number | null, hostId?: number | null, maxPlayers?: number | null, translateFrom?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, translateTo?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, participants?: Array<{ __typename?: 'Participant', playerId?: number | null, score?: number | null, player?: { __typename?: 'User', name?: string | null } | null }> | null } } | null };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'QueryGamesSuccess', data: Array<{ __typename?: 'GameSession', id?: string | null, numRounds?: number | null, start?: any | null, status?: number | null, winnerId?: number | null, translateFrom?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, translateTo?: { __typename?: 'Language', code?: string | null, id?: string | null } | null }> } | null };

export type PointsQueryVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PointsQuery = { __typename?: 'Query', points?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'QueryPointsSuccess', data: Array<{ __typename?: 'Participant', playerId?: number | null, answers?: Array<{ __typename?: 'Answer', points?: number | null }> | null }> } | null };

export type RoundsPreparedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoundsPreparedSubscription = { __typename?: 'Subscription', roundsPrepared?: boolean | null };

export type GameUpdatedSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GameUpdatedSubscription = { __typename?: 'Subscription', gameUpdated?: { __typename?: 'GameUpdated', id?: string | null, numRounds?: number | null, hostId?: number | null, maxPlayers?: number | null, langTranslateFrom?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, langTranslateTo?: { __typename?: 'Language', code?: string | null, id?: string | null } | null, participants?: Array<{ __typename?: 'Participant', score?: number | null, playerId?: number | null, player?: { __typename?: 'User', name?: string | null } | null }> | null } | null };

export type GameStatusSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GameStatusSubscription = { __typename?: 'Subscription', gameStatusUpdated?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'SubscriptionGameStatusUpdatedSuccess', data: string } | null };

export type ParticipantSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ParticipantSubscription = { __typename?: 'Subscription', playerJoined?: Array<{ __typename?: 'ParticipantsPayload', score?: number | null, playerId?: number | null, isJoining?: boolean | null, player?: { __typename?: 'player', name?: string | null } | null }> | null };

export type StartRoundMutationVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateFrom?: InputMaybe<Scalars['String']['input']>;
  langTranslateTo?: InputMaybe<Scalars['String']['input']>;
  hostId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StartRoundMutation = { __typename?: 'Mutation', startRound?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationStartRoundSuccess', data: { __typename?: 'Round', wordTranslateFromId?: number | null, wordTranslateToId?: number | null, id?: string | null, startTime?: any | null } } | null };

export type SubmitAnswerMutationVariables = Exact<{
  answer?: InputMaybe<Scalars['String']['input']>;
  gameId?: InputMaybe<Scalars['Int']['input']>;
  langTranslateTo?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['Int']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'MutationSubmitAnswerSuccess', data: boolean } | null };

export type TimerSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TimerSubscription = { __typename?: 'Subscription', timer?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'SubscriptionTimerSuccess', data: number } | null };

export type PreCountDownSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PreCountDownSubscription = { __typename?: 'Subscription', preCountDown?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'SubscriptionPreCountDownSuccess', data: number } | null };

export type PostCountDownSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostCountDownSubscription = { __typename?: 'Subscription', postCountDown?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'SubscriptionPostCountDownSuccess', data: number } | null };

export type PhaseSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PhaseSubscription = { __typename?: 'Subscription', phase?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'SubscriptionPhaseSuccess', data: RoundPhase } | null };

export type RoundSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RoundSubscription = { __typename?: 'Subscription', round?: { __typename?: 'BaseError' } | { __typename?: 'CustomError', message?: string | null, status?: number | null } | { __typename: 'SubscriptionRoundSuccess', data: { __typename?: 'roundPayload', end?: any | null, id?: number | null, roundNumber?: number | null, start?: any | null, wordTranslateFrom?: string | null, wordTranslateFromId?: number | null, wordTranslateTo?: string | null, wordTranslateToId?: number | null } } | null };

export type PointUpdatedSubscriptionVariables = Exact<{
  gameId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PointUpdatedSubscription = { __typename?: 'Subscription', point?: { __typename?: 'PointPayload', points?: number | null, userId?: number | null } | null };

export type AddUsersMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddUsersMutation = { __typename?: 'Mutation', addUsers?: { __typename?: 'User', name?: string | null, createdAt?: any | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', name?: string | null, createdAt?: any | null }> | null };


export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"2"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"langTranslateFromId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateToId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}}},{"kind":"Argument","name":{"kind":"Name","value":"numRounds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"playerAdded"}},{"kind":"Field","name":{"kind":"Name","value":"roundsPrepared"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const UpdateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"2"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPlayers"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGameSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateFromId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFromId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateToId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateToId"}}},{"kind":"Argument","name":{"kind":"Name","value":"numRounds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numRounds"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPlayers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPlayers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationChangeGameSettingSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGameMutation, UpdateGameMutationVariables>;
export const JoinGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"joinGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationJoinGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"playerAdded"}},{"kind":"Field","name":{"kind":"Name","value":"roundsPrepared"}}]}}]}}]}}]}}]} as unknown as DocumentNode<JoinGameMutation, JoinGameMutationVariables>;
export const ExitGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"exitGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isHost"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exitGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isHost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isHost"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationExitGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<ExitGameMutation, ExitGameMutationVariables>;
export const GameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"game"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGameSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numRounds"}},{"kind":"Field","name":{"kind":"Name","value":"translateFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translateTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hostId"}},{"kind":"Field","name":{"kind":"Name","value":"maxPlayers"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GameQuery, GameQueryVariables>;
export const GamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGamesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numRounds"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"translateFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translateTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const PointsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"points"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryPointsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"}}]}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PointsQuery, PointsQueryVariables>;
export const RoundsPreparedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"roundsPrepared"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roundsPrepared"}}]}}]} as unknown as DocumentNode<RoundsPreparedSubscription, RoundsPreparedSubscriptionVariables>;
export const GameUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"gameUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"langTranslateFrom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"langTranslateTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numRounds"}},{"kind":"Field","name":{"kind":"Name","value":"hostId"}},{"kind":"Field","name":{"kind":"Name","value":"maxPlayers"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}}]}}]}}]}}]} as unknown as DocumentNode<GameUpdatedSubscription, GameUpdatedSubscriptionVariables>;
export const GameStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"gameStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameStatusUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionGameStatusUpdatedSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<GameStatusSubscription, GameStatusSubscriptionVariables>;
export const ParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"participant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerJoined"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isJoining"}}]}}]}}]} as unknown as DocumentNode<ParticipantSubscription, ParticipantSubscriptionVariables>;
export const StartRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFrom"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateTo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"hostId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationStartRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wordTranslateFromId"}},{"kind":"Field","name":{"kind":"Name","value":"wordTranslateToId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<StartRoundMutation, StartRoundMutationVariables>;
export const SubmitAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateTo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"answer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answer"}}},{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"langTranslateTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langTranslateTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSubmitAnswerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<SubmitAnswerMutation, SubmitAnswerMutationVariables>;
export const TimerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"timer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionTimerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<TimerSubscription, TimerSubscriptionVariables>;
export const PreCountDownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"preCountDown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preCountDown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionPreCountDownSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<PreCountDownSubscription, PreCountDownSubscriptionVariables>;
export const PostCountDownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"postCountDown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postCountDown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionPostCountDownSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<PostCountDownSubscription, PostCountDownSubscriptionVariables>;
export const PhaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"phase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionPhaseSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<PhaseSubscription, PhaseSubscriptionVariables>;
export const RoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"round"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionRoundSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roundNumber"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"wordTranslateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"wordTranslateFromId"}},{"kind":"Field","name":{"kind":"Name","value":"wordTranslateTo"}},{"kind":"Field","name":{"kind":"Name","value":"wordTranslateToId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoundSubscription, RoundSubscriptionVariables>;
export const PointUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"pointUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"point"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<PointUpdatedSubscription, PointUpdatedSubscriptionVariables>;
export const AddUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddUsersMutation, AddUsersMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;