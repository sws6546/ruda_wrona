

export default function Posts({ postsType }: { postsType: any }) {

  return (
    <div className="bg-orange-400 p-4 rounded-[50px] border-slate-500 border-8">
      {postsType}
    </div>
  )
}
