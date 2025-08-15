import { createContext } from "react"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Action, State } from "../types/types";



// Supposedly "curried" version or call signatures
export const useGameStore = create<State & Action>()(
  persist<State & Action>(
    (set, _get) => ({
      gameId: null,
      setGameId: (gameId) => set({ gameId: gameId })
    }),
    {
      name: "gameId",
      storage: createJSONStorage(() => localStorage)
    },
  ),
)


export const SubmitContext = createContext(false);
