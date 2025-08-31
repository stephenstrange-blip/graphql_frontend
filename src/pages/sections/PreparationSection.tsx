import { useState, useContext, useEffect, type FormEventHandler } from "react";
import { Form } from "react-router";
import type { langTranslate } from "../../types/types";
import { SubmitContext } from "../../context/context";
import { HorizontalNumberInput } from "../../components/Input";
import { Dropdown } from "../../components/Dropdown";

export function SettingSection({ to, from, numRounds, onSubmit }: { to: langTranslate, from: langTranslate, numRounds: number, onSubmit: React.FormEventHandler<HTMLFormElement> }) {
  const { isFetching } = useContext(SubmitContext)
  const [settings, setSettings] = useState({ to: to.id, from: from.id, numRounds })

  // After render, data may not be available immediately 
  // since it depends on data from the server. 
  // Re-run whenever either one changes.
  useEffect(() => {
    setSettings({
      to: to.id,
      from: from.id,
      numRounds: numRounds
    })
  }, [numRounds, from.id, to.id])

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
    setSettings({ to: to.id, from: from.id, numRounds: numRounds })
    // prevent form submission
    return
  }

  return (
    <Form onSubmit={onSubmit} className="p-5 flex-col flex items-center-safe gap-6">
      <HorizontalNumberInput id="numRounds" value={settings.numRounds} onChange={setSettings}>
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

      <div className="flex flex-row gap-2 justify-center-safe items-center-safe">
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" type="submit" disabled={!!isFetching}>{isFetching ? "Applying..." : "Apply"}</button>
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" onClick={reset}>Reset</button>
      </div>
    </Form>
  )
}

