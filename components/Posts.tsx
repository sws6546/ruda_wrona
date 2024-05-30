import { getPosts, isLoggedForServerComponent } from "@/lib/actions"
import RatingForm from "./RatingForm"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function Posts({ pathname, page }: { pathname: string, page: number }) {
  const posts: any[] = await getPosts(page, pathname)

  let logged = false
  await isLoggedForServerComponent(cookies().get("jwt")?.value as string)
    .then((loggedData: any) => {
      if(loggedData.ok) {
        logged = true
      }
    })

  return (
    <div className="flex flex-col gap-4">
      {
        posts.map((post, idx) => (
          <div key={idx}
            className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 flex flex-col items-start pl-8 pr-8 gap-2">
            <p className="text-2xl font-semibold">{post.title}</p>
            <p className="text-sm">{post.author}</p>
            <hr className="border-1 border-slate-500 w-full" />
            <p className="text-xl">{post.content}</p>
            <hr className="border-1 border-slate-500 w-full" />
            <div className="flex flex-row items-center justify-between w-full">
              {
                logged ?
                  <RatingForm postId={JSON.parse(JSON.stringify(post._id))} />
                  :
                  <p>Zaloguj się</p>
              }
              <Link href={`/post/${JSON.parse(JSON.stringify(post._id))}`} className="hover:text-blue-500 hover:underline"
              >Komentarze</Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}
// TODO: add likes and dislikes
