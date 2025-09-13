export default function Answer({ wordTranslateTo }: { wordTranslateTo: string | undefined | null }) {
  if (wordTranslateTo)
    return <span className="flex flex-col justify-center-safe items-center-safe text-center">Answer is <p className="text-[22px]">{wordTranslateTo}</p></span>

  return <></>
}
