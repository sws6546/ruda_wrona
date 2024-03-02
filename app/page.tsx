import CategorieButton from "@/components/CategorieButton"
import Posts from "@/components/Posts"

export default function Hello() {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="w-full md:w-2/3 text-center pt-10 pb-10 flex flex-col justify-center">
        <div className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8">
          <h1 className="text-[48px] text-red-700">Ruda Wrona Orła nie pokona</h1>
        </div>

        <div className="w-full flex flex-row justify-center gap-4 mt-4">
          <div className="w-1/5 flex flex-col gap-4">
            <CategorieButton title="Główna" link="/" />
            <CategorieButton title="Paszkwile o Tusku" link="/dzialy/tusk-paszkwile" />
            <CategorieButton title="Polexit" link="/dzialy/polexit" />
            <CategorieButton title="Konfederacja ❤" link="/dzialy/konfa" />
            <CategorieButton title="Rolnicy" link="/dzialy/rolnicy" />
            <CategorieButton title="Skutki rewolucji przemysłowej" link="/dzialy/rewolucja" />
          </div>
          <div className="w-4/5">
            <Posts postsType={`asd`} />
          </div>
        </div>
      </div>
    </div>
  )
}
