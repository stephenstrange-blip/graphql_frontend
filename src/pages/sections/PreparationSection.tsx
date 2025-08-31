import { useState, useContext, useEffect } from "react";
import { Form } from "react-router";
import type { langTranslate } from "../../types/types";
import { SubmitContext } from "../../context/context";
import { HorizontalNumberInput } from "../../components/Input";
import { Dropdown } from "../../components/Dropdown";

export function PreparationSection({ to, from, numRounds, onSubmit }: { to: langTranslate, from: langTranslate, numRounds: number, onSubmit: React.FormEventHandler<HTMLFormElement> }) {
  const [value, setValue] = useState<number>(numRounds);
  const { isFetching } = useContext(SubmitContext)

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
    <Form onSubmit={onSubmit} className="p-5 flex-col flex items-center-safe gap-6">
      <HorizontalNumberInput id="numRounds" value={value} onChange={setValue}>
        <label htmlFor="numRounds" className="text-center">Number of Rounds</label>
      </HorizontalNumberInput>
      <span className="flex flex-row gap-50">
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

      <div className="flex flex-row gap-2 justify-center-safe items-center-safe">
        <button className="hover:bg-gray-300 p-2.5 rounded-[5px] min-w-15" type="submit" disabled={!!isFetching}>{isFetching ? "Applying..." : "Apply"}</button>
      </div>
    </Form>
  )
}

