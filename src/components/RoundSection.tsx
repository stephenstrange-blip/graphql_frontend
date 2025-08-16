import { PlayerInput } from "./Input"

function RoundSection() {
  return (
    <div className="flex flex-col justify-around w-full h-[70%]">
      <span className="flex flex-col border-1 items-center-safe h-[50%] justify-around">
        <Countdown />
        <span>
          <p className="text-center">Last Round!</p>
          <p className="text-[48px]">Air Conditioner</p>
        </span>
      </span>
      <PlayerInput />
    </div>
  )
}

function Countdown() {
  return (
    <span className="flex flex-row">
      <p>3</p>
      <p>2</p>
      <p>1</p>
      <p>Go!!!</p>
    </span>
  )
}