import { useState, useContext, useEffect } from "react";
import { Form } from "react-router";
import { SubmitContext } from "../../context/context";
import { HorizontalNumberInput } from "../../components/Input";
import { Dropdown } from "../../components/Dropdown";
import type { SettingSectionArgs } from "../../types/types";


export function SettingSection({ to, from, numRounds, onSubmit, maxPlayers }: SettingSectionArgs) {
  const { isFetching } = useContext(SubmitContext)
  const [settings, setSettings] = useState({ to: to.id, from: from.id, numRounds, maxPlayers: maxPlayers })
  
  // After render, data may not be available immediately 
  // since it depends on data from the server. 
  // Re-run whenever either one changes.
  useEffect(() => {
    setSettings({
      to: to.id,
      from: from.id,
      numRounds,
      maxPlayers
    })
  }, [numRounds, from.id, to.id, maxPlayers])

  const langugageNames = {
    eng: "english",
    ger: "german",
    fil: "filipino",
    kor: "korean"
  }

  const languages = [
    { code: "eng", id: 0 },
    { code: "fil", id: 2 },
    { code: "ger", id: 1 },
    { code: "kor", id: 3 }
  ]

  const languageWithNames = languages.map(item => ({
    code: item.code,
    id: item.id,
    name: langugageNames[item.code as keyof typeof langugageNames]
  }))

  // In case of failed gamesetting update, 
  // or client wants to reset the game settings
  const reset = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSettings({ to: to.id, from: from.id, numRounds, maxPlayers })
    // prevent form submission
    return
  }

  const GAME_SETTINGS = {
    // This is set for all GAMES
    // meaning hosts cannot extend up/down to the limit below
    MAX_PLAYERS: 6,
    MIN_PLAYERS: 1,
    MAX_ROUNDS: 10,
    MIN_ROUNDS: 1,
  }

  const INCREMENT = {
    ROUND: () => {
      setSettings(settings => {
        const { numRounds, ...others } = settings;
        return { numRounds: numRounds < GAME_SETTINGS.MAX_ROUNDS ? numRounds + 1 : numRounds, ...others }
      })
    },
    MAX_PLAYERS: () => {
      setSettings(settings => {
        const { maxPlayers, ...others } = settings;
        return { maxPlayers: maxPlayers < GAME_SETTINGS.MAX_PLAYERS ? maxPlayers + 1 : maxPlayers, ...others }
      })
    }
  }

  const DECREMENT = {
    ROUND: () => {
      setSettings(settings => {
        const { numRounds, ...others } = settings;
        return { numRounds: numRounds > GAME_SETTINGS.MIN_ROUNDS ? numRounds - 1 : numRounds, ...others }
      })
    },
    MAX_PLAYERS: () => {
      setSettings(settings => {
        const { maxPlayers, ...others } = settings;
        return { maxPlayers: maxPlayers > GAME_SETTINGS.MIN_PLAYERS ? maxPlayers - 1 : maxPlayers, ...others }
      })
    }
  }

  return (
    <Form onSubmit={onSubmit} className="p-5 flex-col flex items-center-safe gap-6">
      <HorizontalNumberInput id="numRounds" value={settings.numRounds} increment={INCREMENT.ROUND} decrement={DECREMENT.ROUND}>
        <label htmlFor="numRounds" className="text-center">Number of Rounds</label>
      </HorizontalNumberInput>
      <span className="flex flex-row gap-50">
        <div className="flex" >
          <label htmlFor="from">From: </label>
          <Dropdown
            initialId={settings.from}
            languages={languageWithNames}
            option="from"
            setValue={setSettings}
          />
        </div>
        <div className="flex">
          <label htmlFor="to">To: </label>
          <Dropdown
            initialId={settings.to}
            languages={languageWithNames}
            option="to"
            setValue={setSettings}
          />
        </div>
      </span>
      <HorizontalNumberInput id="maxPlayers" value={settings.maxPlayers} increment={INCREMENT.MAX_PLAYERS} decrement={DECREMENT.MAX_PLAYERS}>
        <label htmlFor="maxPlayers" className="text-center">Maximum Players Allowed:</label>
      </HorizontalNumberInput>

      <div className="flex flex-row gap-2 justify-center-safe items-center-safe">
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" type="submit" disabled={!!isFetching}>{isFetching ? "Applying..." : "Apply"}</button>
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" onClick={reset}>Reset</button>
      </div>
    </Form>
  )
}

