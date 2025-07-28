import type { Route } from "./+types/Game"


export default function GamePage(args: Route.ComponentProps) {
  console.log("I am GamePage and here is my args ", args)
  return (
    <>
      <p>GamePage</p>
    </>
  )
}