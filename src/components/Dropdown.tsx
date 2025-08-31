import type { DropdownArgs } from "../types/types";


// No need to use the 'value' property of select element
// setValue is only used for reset
export function Dropdown({ initialId: initial, languages, option, setValue }: DropdownArgs) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    
    setValue(settings => {
      if (option === "from") {
        const { from, ...others } = settings;
        return { from: value, ...others }
      } else if (option === "to") {
        const { to, ...others } = settings;
        return { to: value, ...others }
      }
      return settings
    })
  }

  return (
    // To force defaultValue to update on rerenders, see the link below
    // https://stackoverflow.com/questions/30146105/react-input-defaultvalue-doesnt-update-with-state
    <select onChange={handleChange} name={option} id={option} defaultValue={initial ?? "0"} key={initial ?? "0"}>
      {languages.map(language =>
        <option value={language.id} key={language.id}>{language.name}</option>
      )}
    </select>
  )
}