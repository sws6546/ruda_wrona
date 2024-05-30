import Link from "next/link";
import { cookies } from "next/headers";
import { isLoggedForServerComponent, logout } from "@/lib/actions";

export default async function Navbar() {

  let logged = false
  let username = ""
  await isLoggedForServerComponent(cookies().get("jwt")?.value as string)
    .then((loggedData: any) => {
      if(loggedData.ok) {
        logged = true
        username = loggedData.ok
      }
    })

  if (logged) {
    logged = true
  }

  return (
    <div className="w-full p-4 bg-orange-400 flex flex-row justify-between pl-8 pr-8">
      <p className="text-red-700 text-xl font-bold">RWONP</p>
      <div className="flex flex-row items-center gap-4">
        {
          logged ? (
            <>
              <h1>{username}</h1>
              <form action={logout}>
                <input type="submit" value="Wyloguj" className="pl-4 pr-4 rounded-xl bg-red-500 hover:bg-red-600 transition" />
              </form>
            </>
          ) : (
            <>
              <Link href={"/login"} className="hover:text-blue-500 hover:underline">Zaloguj się</Link>
              <Link href={"/register"} className="hover:text-blue-500 hover:underline">Zarejestruj się</Link>
            </>
          )
        }
      </div>
    </div>
  )
}
