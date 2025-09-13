import type { Route } from "./+types/Play"
import { Outlet } from "react-router"
import Header from "../components/Header"
import githubIcon from "../assets/github-original.svg"
import linkedInIcon from "../assets/linkedin-plain.svg"

export default function PlayPage(args: Route.ComponentProps) {
  return (
    <div className="bg-dark flex-col lg:max-xl:h-full xs:h-screen w-full flex items-center">
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