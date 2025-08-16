import type { langTranslate } from "../types/types";

export function Dropdown({ initial, languages, option }: { initial: langTranslate, option: "to" | "from", languages: Array<{ code: string, id: number, name: string }> }) {
  return (
    // To force defaultValue to update on rerenders, see the link below
    // https://stackoverflow.com/questions/30146105/react-input-defaultvalue-doesnt-update-with-state
    <select name={option} id={option} defaultValue={initial.id ?? "0"} key={initial.id ?? "0"}>
      {languages.map(language =>
        <option value={language.id} key={language.id}>{language.name}</option>
      )}
    </select>
  )
}