// src/components/Header.tsx
import foldedHandsIcon from '../assets/folded_hands.svg';
import type { ReactElement } from "react"


function Header({ children }: { children?: ReactElement | ReactElement[] }) {
  return (
    <div className='flex flex-row items-center bg-[#dddddd] min-w-full pl-[2rem] p-[1.2rem]'>
      <p className='size-[56px] '>
        <img className="size-full" src={foldedHandsIcon} alt="#" />
      </p>
      <div className='flex flex-row pl-[1rem] tracking-[0.12em] text-[20px] font-logo'>
        <strong>Sprint</strong> Lang
      </div>
      {children}
    </div>
  )
}

export default Header