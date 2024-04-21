"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"

export default function CategorieButton({title, link}: { title: any, link: any }) {
  const Pathname = usePathname()
  return (
    <Link href={link}
          className={`${Pathname == link ? "bg-orange-200" : "bg-orange-400"} transition
           p-4 rounded-[50px] border-slate-500 border-8 hover:bg-orange-500`}>
      <p>{title}</p>

    </Link>
  )
}
