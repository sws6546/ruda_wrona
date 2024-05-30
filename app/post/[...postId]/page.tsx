import { getPost, getPostComments, isLoggedForServerComponent, isPostExist } from "@/lib/actions"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import RatingForm from "@/components/RatingForm"
import AddCommentForm from "@/components/AddCommentForm"

export default async function page({ params }: { params: { postId: string } }) {
  let logged = false
  await isLoggedForServerComponent(cookies().get("jwt")?.value as string)
    .then((loggedData: any) => {
      if(loggedData.ok) {
        logged = true
      }
    })

  if (!await isPostExist(params.postId)) {
    redirect("/")
  }

  const post: any = await getPost(params.postId)
  const comments = await getPostComments(params.postId[0])

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div
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
          </div>
        </div>
        {
          logged ?
            <AddCommentForm postId={params.postId[0]} />
            :
            <div className="bg-red-600 p-4 rounded-[50px] border-slate-500 border-8 flex flex-col items-start pl-8 pr-8 gap-2">
              <p>Zaloguj się, by dodać komentarz</p>
            </div>
        }
        {
          comments.map((comment, idx) => (
            <div key={idx}
              className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 flex flex-col items-start pl-8 pr-8 gap-2">
              <p className="text-md">{comment.comment}</p>
              <hr className="border-1 border-slate-500 w-full" />
              <p className="text-sm">{post.author}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
