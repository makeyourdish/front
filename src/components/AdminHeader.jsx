import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { IoCaretBackOutline } from "react-icons/io5"
import { MdWeb } from "react-icons/md"
import AppContext from "./AppContext"

const AdminHeader = () => {
  const { session } = useContext(AppContext)
  let userName = null

  if (session) {
    userName = JSON.parse(session).payload.userName
  }

  return (
    <header className="bg-gray-800 flex items-center justify-between px-4 py-2">
      <Link href="/administration">
        <a className="flex items-center justify-center text-white transition-all duration-75 hover:scale-105 hover:opacity-50">
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
          <a className="flex items-center justify-center md:border md:p-2 rounded transition-all duration-75 hover:bg-white hover:text-black focus:outline focus:outline-4 focus:outline-white/75">
            <IoCaretBackOutline className="hidden md:block mr-2" />
            <MdWeb className="md:hidden block text-4xl" />
            <p className="hidden md:block">Retourner sur le site</p>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default AdminHeader
