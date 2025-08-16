import type { langTranslate } from "../types/types";
import { PreparationSection } from "./PreparationSection";
import { ProgressSection } from "./ProgressSection";

export function GameSection({ to, from, numRounds, onSubmit }: { to: langTranslate, from: langTranslate, numRounds: number, onSubmit: React.FormEventHandler<HTMLFormElement> }) {
  return (
    <div className="col-span-3 row-span-3 relative flex justify-center-safe items-center-safe [&>*]:border-1 ">
      {/* <RoundSection /> */}
      <PreparationSection to={to} from={from} numRounds={numRounds} onSubmit={onSubmit} />
      <button>Start game</button>
      <ProgressSection />
    </div>
  )
}