export default function Answer({ wordTranslateTo }: { wordTranslateTo: string | undefined | null }) {
  if (wordTranslateTo)
    return <span className="flex flex-col justify-center-safe items-center-safe">Answer is <p className="text-[38px]">{wordTranslateTo}</p></span>

  return <></>
}
