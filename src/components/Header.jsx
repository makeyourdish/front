import Link from "next/link"

import { useContext } from "react"
import AppContext from "../components/AppContext"
import { FaUserAlt } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import { RiLogoutBoxFill } from "react-icons/ri"

// props.headercolor : "drink" or "food"

const Header = ({ headercolor }) => {
  const { session, signOut } = useContext(AppContext)

  let user = null

  if (session) {
    user = JSON.parse(session)
  }

  return (
    <header
      className={`${
        headercolor === "food" ? "bg-food-primary" : "bg-drink-primary"
      } flex items-center justify-between py-2 px-8 md:px-5 md:py-4 rounded-b-3xl`}
    >
      <div
        className={`${
          headercolor === "food" ? "text-white" : "text-black"
        } flex items-center justify-center`}
      >
        <p className="md:mr-5">LOGO</p>
        <h1 className="hidden md:block text-3xl">Make Your Dish</h1>
      </div>

      {user ? (
        <div>
          <button onClick={signOut}>
            <RiLogoutBoxFill />
          </button>
          <Link href={`/users/${user.id}`}>
            <a className="hover-bg-secondary text-primary py-1 pl-2 pr-1 flex items-center justify-center bg-white rounded-r-full transition-all hover:text-white">
              <p>{user.email}</p>
              <FaUserAlt className="ml-1 text-2xl" />
            </a>
          </Link>
        </div>
      ) : (
        <Link href="/signin">
          <a className="bg-white md:px-4 md:py-2 secondary-font rounded-2xl drop-shadow-md hidden md:flex  items-center justify-center">
            <FaUserAlt className="mr-2" />
            <p>Se connecter</p>
          </a>
        </Link>
      )}

      <FiMenu className="text-white md:hidden text-4xl" />
    </header>
  )
}

export default Header
