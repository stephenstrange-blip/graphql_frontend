import type { Route } from "./+types/Play"
import { Outlet } from "react-router"
import Header from "../components/Header"
import githubIcon from "../assets/github-original.svg"
import linkedInIcon from "../assets/linkedin-plain.svg"

export default function PlayPage(args: Route.ComponentProps) {
  console.log("I am PlayPage and here is my args ", args)
  return (
    <div className="flex-col h-screen w-full flex items-center">
      <Header>
        <p className="ms-auto size-[26px]">
          <img  className="size-full" src={githubIcon}  alt="#"/>
        </p>
        <p className="ms-[1rem] size-[26px]">
          <img  className="size-full" src={linkedInIcon}  alt="#"/>
        </p>
      </Header>
      <Outlet />
    </div>
  )
}