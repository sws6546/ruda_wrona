import { getPosts } from "@/lib/actions"

export default async function Posts({ pathname, page }: { pathname: string, page: number }) {
  const posts: any[] = await getPosts(page, pathname)

  return (
    <div className="flex flex-col gap-4">
      {
        posts.map((post, idx) => (
          <div key={idx} className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 flex flex-col items-start pl-8 pr-8 gap-2">
            <p className="text-2xl font-semibold">{post.title}</p>
            <p className="text-sm">{post.author}</p>
            <hr className="border-1 border-slate-500 w-full" />
            <p className="text-xl">{post.content}</p>
            <p>{post.createdDate}</p>
          </div>
        ))
      }
    </div>
  )
}
// TODO: add likes and dislikes
