import clientPromise from "@/lib/mongodb"


export async function POST(req: Request) {
  const body = await req.json()

  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const postsCollection = db.collection('posts')
  const posts = await postsCollection.find({ path: body.pathName }).skip(body.from).limit(10).toArray()

  return new Response(JSON.stringify(posts))
}
