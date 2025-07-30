import type { Route } from "./+types/Home"

// import UserDisplay from "../components/UserDisplay"
import Header from '../components/Header'
import { Link } from "react-router"

export default function Home(args: Route.ComponentProps) {
  console.log("Home args: ", args)

  return (
    <div className="bg-[#e7e7e7] flex-col h-screen w-full flex items-center gap-y-0.5 ">
      <Header />

      <main className="size-full flex flex-col justify-center-safe items-center-safe">
        <p className="text-[30px] text-[#000000]">Welcome</p>

        <div className="flex flex-row">
          Let's <Link to={"/play"} className="pl-[5px] pr-[5px] hover:text-gray-700"> play,</Link> <p>Jade</p>.
        </div>
      </main>
    </div>
  )
}