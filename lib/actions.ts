"use server"

import clientPromise from "./mongodb"
import { hash, compare } from "bcryptjs"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"

export async function getPosts(page: number, pathname: string) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const postsCollection = db.collection('posts')

  return await postsCollection.find({ path: pathname }).skip(page - 1).limit(10).toArray()
}

export async function getSections() {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const sectionsCollection = db.collection('sections')

  return await sectionsCollection.find().toArray()
}

export async function register(formData: FormData) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const userCollection = db.collection('users')

  const user = await userCollection.find({ username: formData.get("uName") }).toArray()
  if (JSON.parse(JSON.stringify(user)).length == 0) {
    await userCollection.insertOne({ username: formData.get('uName'), password: await hash(formData.get("uPwd") as string, 10) })
    cookies().delete("err")
    cookies().set("jwt", jwt.sign({ username: formData.get("uName") }, process.env.JWT_TOKEN as string))
  }
  else {
    cookies().set("err", "account already exist")
  }
  redirect("/")
}

export async function logout() {
  const cookiesToDelete = cookies().getAll()
  cookiesToDelete.forEach((cookie) => {
    cookies().delete(cookie.name)
  })
  redirect("/")
}

export async function login(formData: FormData) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const userCollection = db.collection('users')

  const user = await userCollection.findOne({ username: formData.get("uName") })
  if (user != null) {
    if (await compare(formData.get("uPwd") as string, user.password)) {
      cookies().set("jwt", jwt.sign({ username: formData.get("uName") }, process.env.JWT_TOKEN as string))
      cookies().delete("err")
      redirect("/")
    } else {
      cookies().set("err", "bad password")
    }
  } else {
    cookies().set("err", "bad username")
  }
}

