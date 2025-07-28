import type { Route } from "./+types/Play"
import { Outlet } from "react-router"

export default function PlayPage(args: Route.ComponentProps) {
  console.log("I am PlayPage and here is my args ", args)
  return (
    <>
      <p>PlayPage</p>
      <Outlet/>
    </>
  )
}