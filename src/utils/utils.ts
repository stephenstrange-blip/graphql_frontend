import type { Participant, Participants } from "../types/types";

export function filterParticipants(participants: Participants): { player: Participant, opponents: Participants } {
  let player: Participant = {}, opponents = [], userId = sessionStorage.getItem("userId");

  if (participants) {
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
