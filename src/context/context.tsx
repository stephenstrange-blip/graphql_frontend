import { createContext } from "react"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Action, langTranslate, State } from "../types/types";
import type { RefObject } from "react";


// Supposedly "curried" version or call signatures
export const useGameStore = create<State & Action>()(
  persist<State & Action>(
    (set, _get, store) => ({
      gameId: null,
      status: "waiting",
      setGameId: (gameId) => set({ gameId: gameId }),
      setStatus: (status) => set({ status: status }),
      reset: () => { set(store.getInitialState()) }
    }),
    {
      name: "gameId",
      storage: createJSONStorage(() => sessionStorage)
    },
  ),
)

export const SubmitContext = createContext<{ isUpdating: boolean, langTranslateTo: langTranslate["code"], pointRef: RefObject<HTMLSpanElement | null> | null }>({ isUpdating: false, langTranslateTo: null, pointRef: null });
