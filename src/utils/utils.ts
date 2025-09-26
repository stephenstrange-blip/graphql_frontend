import type { ParticipantSubscription } from "../graphql/generated";
import type { Participant, Participants } from "../types/types";

export function filterParticipants(participants: Participants): { player: Participant, opponents: Participants } {
  let player: Participant = {}, opponents = [], userId = sessionStorage.getItem("userId");

  if (participants.length > 0) {
    for (let participant of participants) {
      if (participant.playerId === Number(userId))
        player = participant
      else
        opponents.push(participant)
    }
  }

  return { player, opponents }
}

// for type completion when defining the schema argument
export function parseFormData<T extends Record<keyof T, number>>(form: FormData, schema: { [K in keyof T]: "number" }) {
  const result = {} as T;

  for (const key in schema) {
    const value = Number(form.get(key));

    if (Number.isNaN(value))
      throw new Error(`Field ${key} must be a number`);

    (result[key] as number) = value
  }
  return result
}

export async function sleep(n: number) {
  return await new Promise(resolve => setTimeout(resolve, n))
}

export function getAllPoints(arr: { playerId?: number | null | undefined, answers?: Array<{ points?: number | null | undefined }> | null }[]) {

  const payload = arr.map(user => {
    let totalPoints = 0;
    if (user && user.answers)
      totalPoints = user.answers.reduce((prev, curr) => prev + (curr.points ?? 0), 0)

    if (user.playerId === undefined || user.playerId === null)
      warn(`No playerId found at user`, user)
    return { points: totalPoints, userId: user.playerId }
  })

  return payload;

}

export function warn(message: string, ...args: any) {
  console.warn('Warning: ', message)

  if (args.length > 0)
    for (const arg of args) {
      // TODO: TRY TO PUT THE SAME OUTPUT STYLE AS CONSOLE.WARN()
      console.dir(arg, { depth: null })
    }

  console.warn(new Error().stack)
}


export function debounce<T extends (...args: []) => void>(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer!);
    timer = setTimeout((_: any) => {
      timer = null;
      fn.apply(this, args)
    }, ms)
  }
}


export function formatParticipantPayload(arr: ParticipantSubscription["playerJoined"]) {
  return arr?.map(item => {
    const { __typename, player, ...payloadKeys } = item;
    return { ...payloadKeys, player: { name: player?.name } }
  })
}