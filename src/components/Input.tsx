import { useState, type ReactNode } from "react"
import { Form } from "react-router"

export function PlayerInput() {
  const [answer, setAnswer] = useState('')
  return (
    <div>
      <Form className="text-center">
        <label htmlFor="answer"></label>
        {/* TODO: REMOVE BORDER WHEN ACTIVE */}
        <input
          className=" min-w-input-constraint text-[48px] focus:border-none border-b-2  hover:"
          type="text"
          id="answer"
          name="answer"
          value={answer} onChange={e => setAnswer(e.currentTarget.value)}
        />
      </Form>
    </div>
  )
}

export function HorizontalNumberInput({ children, id, onChange, value }:
  { children?: ReactNode, id: string, value: number, onChange: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div className="flex flex-col">
      {/* for labels - if any */}
      {children}
      <div className="flex-row flex">
        <div className="left-arrow" onClick={() => onChange(v => v === 0 ? v : v - 1)}>-</div>
        <input className="text-center" type="number" id={id} name={id} value={value} key={value} readOnly />
        <div className="right-arrow" onClick={() => onChange(v => v === 10 ? v : v + 1)}>+</div>
      </div>
    </div>
  )
}