import Link from "next/link"

export default function CategorieButton({title, link}: {title: any, link:any}){
  return (
    <Link href={link} className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 hover:bg-orange-500">
      <p>{title}</p>
    </Link>
  )
}
