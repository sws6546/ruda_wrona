import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/lib/actions";

export default async function Navbar() {

  let logged = false
  const data = await fetch("http://localhost:3000/api/isLogged", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      jwt: cookies().get("jwt")?.value
    })
  })
  const loggedData = await data.json()
  if (loggedData.ok) {
    logged = true
  }

  return (
    <div className="w-full p-4 bg-orange-400 flex flex-row justify-between pl-8 pr-8">
      <p className="text-red-700 text-xl font-bold">RWONP</p>
      <div className="flex flex-row items-center gap-4">
        {
          logged ? (
            <>
              <h1>{loggedData.ok}</h1>
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
