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
    <div className="flex flex-col gap-5">
      {/* for labels - if any */}
      {children}
      <div className="flex-row flex">
        <div onClick={() => onChange(v => v === 1 ? v : v - 1)}>
          <p className="p-2.5 pr-5 pl-5 cursor-pointer hover:bg-gray-300 rounded-3xl">-</p>
        </div>
        <input className="text-center focus:border-0 max-w-fit w-20 pl-0.5" type="number" id={id} name={id} value={value} key={value} readOnly />
        <div onClick={() => onChange(v => v === 10 ? v : v + 1)}>
          <p className="p-2.5 pr-5 pl-5 cursor-pointer hover:bg-gray-300 rounded-3xl">+</p>
        </div>
      </div>
    </div>
  )
}