"use client"

import { addComment } from "@/lib/actions"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function AddCommentForm({ postId }: { postId: string }) {
  const [commentContent, setCommentContent] = useState<string>("")
  const [err, setErr] = useState<string>("")
  const router = useRouter()

  const sendComment = () => {
    addComment(postId, commentContent)
      .then(data => {
        if (data.err) {
          setErr(data.err)
        }
      })
    router.refresh()
  }

  return (
    <div className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 flex flex-col items-start pl-8 pr-8 gap-2 mb-3">
      <label htmlFor="comment">Komentarz</label>
      <input onChange={(e) => setCommentContent(e.target.value)} type="text" id="comment" name="comment"
        className="rounded-xl w-full bg-slate-300 pl-2 pr-2" placeholder="eg. Łutyt" />

      <p className="text-red-800">{err}</p>
      <input onClick={() => sendComment()} type="button" value="Wyślij komentarz"
        className="pl-2 pr-2 p-1 bg-orange-600 hover:bg-orange-500 transition cursor-pointer rounded-xl" />
    </div>
  )
}
