import type { Dispatch, FormEventHandler, SetStateAction } from "react"
import { Form } from "react-router"

const re = /^[0-9]+$/

export default function Dialog({ ref, value, setValue, handleClick, joining }: { joining: boolean, ref: React.RefObject<HTMLDialogElement | null>, value: string, setValue: Dispatch<SetStateAction<string>>, handleClick: FormEventHandler<HTMLFormElement> }) {


  return (
    <dialog className="backdrop:bg-gray-900 backdrop:opacity-50 fixed open:w-[250px] inset-0 m-auto rounded-2xl p-5" ref={ref}>
      <Form onSubmit={handleClick} className="flex flex-col p-2 gap-y-3.5">
        <label htmlFor="gameId" className="text-center">Room ID:</label>
        <input  className="text-center border-b-1 focus:border-0 " type="text" name="gameId" id="gameId" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
        <div className="flex flex-row justify-center-safe items-center-safe gap-1.5 ">
          <button className="p-2 bg-gray-300 rounded-[5px] hover:bg-gray-600 hover:text-amber-100"
            onClick={(e) => {
              e.preventDefault();
              setValue("")
              return ref.current?.close();
            }}>Back</button>
          <button className={`disabled:opacity-55 p-2 bg-gray-300 rounded-[5px] hover:bg-gray-600 hover:text-amber-100`} disabled={!value || value.trim() === "" || !re.test(value)} type="submit">{joining ? "Loading..." : "Join"}</button>
        </div>
      </Form>
    </dialog>
  )
}