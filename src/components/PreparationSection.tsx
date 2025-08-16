import { useState, useContext, useEffect } from "react";
import { Form } from "react-router";
import type { langTranslate } from "../types/types";
import { SubmitContext } from "./context";
import { HorizontalNumberInput } from "./Input";
import { Dropdown } from "./Dropdown";

export function PreparationSection({ to, from, numRounds, onSubmit }: { to: langTranslate, from: langTranslate, numRounds: number, onSubmit: React.FormEventHandler<HTMLFormElement> }) {
  const [value, setValue] = useState<number>(numRounds);
  const isFetching = useContext(SubmitContext)

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

  useEffect(() => {
    setValue(numRounds)
  }, [numRounds])

  const languageWithNames = languages.map(item => ({
    code: item.code,
    id: item.id,
    name: langugageNames[item.code as keyof typeof langugageNames]
  }))

  return (
    <Form onSubmit={onSubmit}>
      <HorizontalNumberInput id="numRounds" value={value} onChange={setValue}>
        <label htmlFor="numRounds">Number of Rounds</label>
      </HorizontalNumberInput>
      <span className="flex flex-row">
        <div className="flex" >
          <label htmlFor="from">From: </label>
          <Dropdown
            initial={from}
            languages={languageWithNames}
            option="from"
          />
        </div>
        <div className="flex">
          <label htmlFor="to">To: </label>
          <Dropdown
            initial={to}
            languages={languageWithNames}
            option="to"
          />
        </div>
      </span>

      <button type="submit" disabled={!!isFetching}>{isFetching ? "Loading..." : "Edit"}</button>
    </Form>
  )
}