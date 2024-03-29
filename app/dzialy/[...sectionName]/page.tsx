import CategorieButton from "@/components/CategorieButton"
import Posts from "@/components/Posts"
import { getSections } from "@/lib/actions"
import { redirect } from "next/navigation"

export default async function Hello({ params }: { params: { sectionName: string[] | number[] } }) {
  const sections = await getSections()

  let sectionExist = false
  sections.forEach(section => {
    if (section.path.slice(8) == params.sectionName[0]) {
      sectionExist = true
    }
  })
  if (sectionExist == false) {
    redirect("/")
  }

  let page = +params.sectionName[1]
  if (page == undefined || isNaN(page)) {
    page = 1
  }

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="w-full md:w-2/3 text-center pt-10 pb-10 flex flex-col justify-center">
        <div className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8">
          <h1 className="text-[48px] text-red-700">Ruda Wrona Orła nie pokona</h1>
        </div>

        <div className="w-full flex flex-row justify-center gap-4 mt-4">
          <div className="w-2/6 flex flex-col gap-4">
            {
              sections.map((section, id) => (
                <CategorieButton title={section.name} link={section.path} key={id} />
              ))
            }
          </div>
          <div className="w-4/6">
            <Posts pathname={`/dzialy/${params.sectionName[0]}`} page={page} />
          </div>
        </div>
      </div>
    </div>
  )
}
