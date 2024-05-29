'use client'

import { addLike, getPostLikes, isPostLiked } from "@/lib/actions"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function RatingForm({ postId }: { postId: string }) {
  const [isClicked, setIsClicked] = useState(false)
  const [likes, setLikes] = useState<number>(0)
  const [click, setClick] = useState<number>(0)

  const likeHandleClick = (likeValue: number) => {
    addLike(postId, likeValue)
    setIsClicked(true)
    setClick(c => c+1)
  }

  useEffect(() => {
    isPostLiked(postId)
    .then(isLiked => {
      setIsClicked(isLiked)
    })
    getPostLikes(postId)
    .then(likesValue => {
      setLikes(likesValue)
    })
  }, [click])

  return (
    <div className={`${isClicked? "bg-blue-400" : "bg-orange-400"} flex flex-row justify-center gap-2`}>
      <button onClick={() => likeHandleClick(1)}><Image width={35} height={35} src='/polska.png' alt="Pl" /></button>
      <p>{likes}</p>
      <button onClick={() => likeHandleClick(-1)}><Image width={35} height={35} src='/niemcy.png' alt="De" /></button>
    </div>
  )
}
