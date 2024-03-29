"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CategorieButton({ title, link }: { title: any, link: any }) {
  const Pathname = usePathname()
  return (
    <Link href={link} className={`bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 hover:bg-orange-500`}>
      <p>{title}</p>
    </Link>
  )
}
