import { isLoggedForServerComponent, login } from "@/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  let logged = false
  await isLoggedForServerComponent(cookies().get("jwt")?.value as string)
    .then((loggedData: any) => {
      if(loggedData.ok) {
        logged = true
      }
    })

  if (logged) {
    redirect("/")
  }

  return (
    <div className="w-full flex flex-row justify-center mt-20">
      <form action={login} className="bg-orange-400 p-8 rounded-[50px] flex flex-col gap-4 border-slate-500 border-8">
        <label htmlFor="uName"> Nazwa urzytkownika </label>
        <input type="text" id="uName" name="uName" className="rounded-xl" />
        <label htmlFor="uPwd"> Hasło </label>
        <input type="password" id="uPwd" name="uPwd" className="rounded-xl" />
        <p className="text-red-800">{cookies().get("err")?.value}</p>
        <input type="submit" value="ZALOGUJ" className="p-4 bg-blue-400 hover:bg-blue-500 transition cursor-pointer rounded-xl" />
      </form>
    </div>
  )
}
