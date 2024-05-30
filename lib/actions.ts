"use server"

import clientPromise from "./mongodb"
import { hash, compare } from "bcryptjs"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"

export async function getPostComments(postId: string) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const commentsCollection = db.collection('comments')

  return await commentsCollection.find({ post: postId }).sort({ createdDate: -1 }).toArray()
}

export async function addComment(postId: string, comment: string) {
  const userToken = cookies().get("jwt")?.value
  const authData: any = isLogged(userToken as string)
  if (authData.err) {
    return { err: "no jwt :(" }
  }
  const user = authData.ok

  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const commentsCollection = db.collection('comments')

  const newestPost = await commentsCollection.findOne({ user: user }, { sort: { createdDate: -1 } })
  if (newestPost) {
    if (Date.now() - newestPost.createdDate < 30000) {
      return { err: "wait a moment" }
    }
  }

  await commentsCollection.insertOne({
    user: user,
    post: postId,
    comment: comment,
    createdDate: Date.now()
  })

  return { msg: "comment Added" }
}


export async function getPost(postId: string) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const postsCollection = db.collection('posts')

  return await postsCollection.findOne(new ObjectId(`${postId}`))
}

export async function isPostExist(postId: string) {
  if(postId[0].length != 24) {
    return false
  }

  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const postsCollection = db.collection('posts')

  const post = await postsCollection.findOne(new ObjectId(`${postId}`))
  if (post == null) {
    return false
  } else {
    return true
  }
}

export async function getPostLikes(postId: string) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const likesCollection = db.collection('likes')

  const likes = await likesCollection.find({ post: postId }).toArray()
  let likesSum = 0
  likes.forEach(like => {
    likesSum += like.like
  })
  return likesSum
}

export async function isPostLiked(postId: string) {
  const userToken = cookies().get("jwt")?.value
  const authData: any = isLogged(userToken as string)
  if (authData.err) {
    return false
  }
  const user = authData.ok

  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const likesCollection = db.collection('likes')

  const isPostLiked = await likesCollection.findOne({ user: user, post: postId })
  if (isPostLiked == null) {
    return false
  } else {
    return true
  }
}

export async function addLike(postId: string, likeValue: number) {
  const userToken = cookies().get("jwt")?.value
  const authData: any = isLogged(userToken as string)
  if (authData.err) {
    return
  }
  const user = authData.ok

  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const likesCollection = db.collection('likes')

  const isPostLiked = await likesCollection.findOne({ user: user, post: postId })
  if (isPostLiked == null) {
    await likesCollection.insertOne({
      user: user,
      post: postId,
      like: likeValue
    })
  } else {
    await likesCollection.updateOne({ user: user, post: postId }, { $set: { like: likeValue } })
  }
}

export async function getPosts(page: number, pathname: string) {
  const client = await clientPromise
  const db = client.db("ruda-wrona")
  const postsCollection = db.collection('posts')

  // return await postsCollection.find({path: pathname}).sort({createdDate: -1}).skip(page - 1).limit(10).toArray()
  return await postsCollection.find({ path: pathname }).sort({ createdDate: -1 }).toArray()
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
    await userCollection.insertOne({
      username: formData.get('uName'),
      password: await hash(formData.get("uPwd") as string, 10)
    })
    cookies().delete("err")
    cookies().set("jwt", jwt.sign({ username: formData.get("uName") }, process.env.JWT_TOKEN as string))
    redirect("/")
  } else {
    cookies().set("err", "account already exist")
  }
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

export async function isLoggedForServerComponent(token: string) {
  return isLogged(token)
}

function isLogged(token: string) {
  if (token == undefined || token == "") {
    return { err: "no jwt :(" }
  }

  let toReturn = {}

  jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, decoded: any) => {
    if (err) {
      toReturn = { err: "bad token" }
    }
    else {
      toReturn = { ok: decoded.username }
    }
  })

  return toReturn
}