import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  const body = await req.json()
  if (body.jwt == undefined) {
    return new Response(JSON.stringify({ err: "no jwt :(" }))
  }

  let toReturn = {}

  jwt.verify(body.jwt, process.env.JWT_TOKEN as string, (err: any, decoded: any) => {
    if (err) {
      toReturn = { err: "bad token" }
    }
    else {
      toReturn = { ok: decoded.username }
    }
  })

  return new Response(JSON.stringify(toReturn))
}
