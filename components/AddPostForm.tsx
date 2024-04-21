'use client'

import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

type props = {
  section: string
}

const AddPostForm = (props: props) => {
  const router = useRouter()
  const [postTitle, setPostTitle] = useState<string>("")
  const [postContent, setPostContent] = useState<string>("")
  const [err, setErr] = useState<string>("")

  const sendPost = () => {
    if (postTitle.trim() === "" || postContent.trim() === "") {
      setErr("bad data")
      return
    }

    axios.post('/api/addPost', {
      postTitle: postTitle.trim(),
      postContent: postContent.trim(),
      section: props.section,
    }).then((e) => {
      if (e.data.err != undefined) {
        setErr(e.data.err)
      } else {
        setErr("")
      }
      router.refresh()
    })
  }

  return (
    <div
      className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8 flex flex-col items-start pl-8 pr-8 gap-2 mb-3">
      <label htmlFor="title">Tytuł posta</label>
      <input onChange={(e) => setPostTitle(e.target.value)} type="text" id="uName" name="uName"
             className="rounded-xl w-full bg-slate-300 pl-2 pr-2" placeholder="eg. Łutyt"/>
      <label htmlFor="content">Treść posta</label>
      <textarea onChange={(e) => setPostContent(e.target.value)} name="content" id="content" rows={2}
                className="rounded-xl w-full bg-slate-300 p-2" placeholder="eg. Zadupienie tuby"></textarea>
      <p>{err}</p>
      <input onClick={() => sendPost()} type="button" value="Wyślij post"
             className="pl-2 pr-2 p-1 bg-orange-600 hover:bg-orange-500 transition cursor-pointer rounded-xl"/>
    </div>
  )
}

export default AddPostForm;