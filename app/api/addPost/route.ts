import clientPromise from "@/lib/mongodb"
import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const {postTitle, postContent, section} = await req.json()
  const token = req.cookies.get("jwt")?.value

  let username: string = ""

  if(token == undefined) {
    return new Response(JSON.stringify({err: "bad token"}))
  }
  jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, decoded: any) => {
    if (err) {
      return new Response(JSON.stringify({err: "bad token"}))
    }
    else {
      username = decoded.username
    }
  })

  if(
    postTitle == "" ||
    postContent == "" ||
    section == ""
  ) {
    return new Response(JSON.stringify({err: "bad data"}))
  }

  const client = await clientPromise
  const postsCollecion = client.db("ruda-wrona").collection('posts')

  const postValue = {
    author: username,
    title: postTitle,
    content: postContent,
    path: `/dzialy/${section}`,
    likes: 0,
    dislikes: 0,
    createdDate: Date.now(),
  }

  await postsCollecion.insertOne(postValue);

  return new Response(JSON.stringify({msg: "post Added"}))
}
