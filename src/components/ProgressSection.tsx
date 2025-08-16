import githubIcon from "../assets/github-original.svg"

export function ProgressSection() {
  return (
    <div className=" flex flex-col justify-center-safe items-center-safe absolute top-0 right-0 min-w-[270px] min-h-[80px] p-4.5">
      <ProgressDisplay />
    </div>
  )
}

export function ProgressDisplay() {
  return (
    <div className="flex flex-row w-full h-[26px] items">
      <p className="h-full w-[10%] me-1.5">
        <img className="size-full" src={githubIcon} alt="#" />
      </p>
      <div className="h-full w-[90%] flex flex-row items-center-safe">
        {/* Make its width dynamic */}
        <p className=" border-b-2 w-[100%] h-[50%] bg-blue-950"></p>
      </div>
    </div>
  )
}