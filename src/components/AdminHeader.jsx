import Link from "next/link"
import Image from "next/image"
// import { useContext } from "react"
import { IoCaretBackOutline } from "react-icons/io5"
// import AppContext from "./AppContext"

const AdminHeader = () => {
  // const { session } = useContext(AppContext)

  // let accountEmail = null
  let userName = "SokouPM"

  // if (session) {
  //   userName = JSON.parse(session).userName
  // }

  return (
    <header className="bg-slate-800 flex items-center justify-between px-4 py-2">
      <Link href="/administration">
        <a className="flex items-center justify-center text-white transition-all hover:scale-105 hover:opacity-50">
          <Image src="/logoWhite.png" alt="logo" width={50} height={50} />
          <h1 className="hidden md:block ml-3 text-3xs lg:text-lg">
            Make Your Dish <br />
            <span className="text-xs underline">administration</span>
          </h1>
        </a>
      </Link>

      <div className="flex-grow flex items-center justify-center text-white md:text-2xl text-center px-3">
        Bienvenue {userName}
      </div>

      <div className="flex items-center justify-center text-white text-xl">
        <Link href="/">
          <a className="flex items-center justify-center border p-2 rounded transition-all hover:bg-white hover:text-black focus:outline focus:outline-3 focus:outline-white/75">
            <IoCaretBackOutline className="mr-2" />
            <p className="hidden md:block">Retourner sur le site</p>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default AdminHeader
