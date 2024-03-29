import { register } from "@/lib/actions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Login() {
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
    redirect("/")
  }


  return (
    <div className="w-full flex flex-row justify-center mt-20">
      <form action={register} className="bg-orange-400 p-8 rounded-[50px] flex flex-col gap-4 border-slate-500 border-8">
        <label htmlFor="uName"> Nazwa urzytkownika </label>
        <input type="text" id="uName" name="uName" className="rounded-xl" />
        <label htmlFor="uPwd"> Hasło </label>
        <input type="text" id="uPwd" name="uPwd" className="rounded-xl" />
        <p className="text-red-800">{cookies().get("err")?.value}</p>
        <input type="submit" value="ZAREJESTRUJ" className="p-4 bg-blue-400 hover:bg-blue-500 transition cursor-pointer rounded-xl" />
      </form>
    </div>
  )
}
