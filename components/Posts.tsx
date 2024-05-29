import { getPosts } from "@/lib/actions"
import RatingForm from "./RatingForm"
import { cookies } from "next/headers"

export default async function Posts({ pathname, page }: { pathname: string, page: number }) {
  const posts: any[] = await getPosts(page, pathname)
  let logged = false
  const data = await fetch("http://localhost:3000/api/isLogged", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      jwt: cookies().get("jwt")?.value
    })
  })
  const loggedData = await data.json()
  if (loggedData.ok) {
    logged = true
  }

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
            {
              logged ?
                <RatingForm postId={JSON.parse(JSON.stringify(post._id))} />
              :
                <p>Zaloguj się, by móc oceniać</p>
            }
          </div>
        ))
      }
    </div>
  )
}
// TODO: add likes and dislikes
