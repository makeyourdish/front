import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import AppContext from "../components/AppContext"
import useWindowDimensions from "../components/services/useWindowDimantions"
import { FaUserAlt } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import { RiLogoutBoxFill } from "react-icons/ri"

const NavMobile = ({ account, signOut, headercolor }) => {
  const buttonStyle =
    "bg-white md:px-4 md:py-2 secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  return (
    <nav
      className={`${
        headercolor === "food" ? "bg-food-primary" : "bg-drink-primary"
      } flex flex-col items-center justify-center py-2 -mt-1 rounded-b-3xl drop-shadow-md mb-2`}
    >
      <h1
        className={`${
          headercolor === "food" ? "text-white" : "text-black"
        } text-center text-2xl mb-3`}
      >
        Make Your Dish
      </h1>
      {account ? (
        <div className="flex items-center justify-center">
          <Link href={`/accounts/${account.id}`}>
            <a
              className={`${buttonStyle} flex items-center justify-center mr-3 px-6 py-2`}
            >
              <FaUserAlt className="mr-2" />
              <p>{account.userName}</p>
            </a>
          </Link>
          <button
            onClick={signOut}
            className={`${buttonStyle} flex items-center justify-center  px-4 py-2`}
          >
            <RiLogoutBoxFill className="text-2xl" />
          </button>
        </div>
      ) : (
        <Link href="/signin">
          <a
            className={`${buttonStyle} flex items-center justify-center px-12 py-2`}
          >
            <FaUserAlt className="mr-2" />
            <p>Se connecter</p>
          </a>
        </Link>
      )}
    </nav>
  )
}

const Header = ({ headercolor }) => {
  const { session, signOut } = useContext(AppContext)
  const { width } = useWindowDimensions() // get window size
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const buttonStyle =
    "bg-white md:px-4 md:py-2 secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  let account = null

  if (session) {
    account = JSON.parse(session)
  }

  useEffect(() => {
    if (width >= 768) {
      setMobileMenuVisible(false)
    }
  }, [width])

  // props.headercolor : change the color of header : "drink" or "food"
  return (
    <>
      <header
        className={`${
          headercolor === "food" ? "bg-food-primary" : "bg-drink-primary"
        } py-2 px-8 md:px-5 md:py-4 w-full ${
          !mobileMenuVisible && "rounded-b-3xl drop-shadow-md mb-2"
        }`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`${
              headercolor === "food" ? "text-white" : "text-black"
            } flex items-center justify-center`}
          >
            <p className="md:mr-5">LOGO</p>
            <h1 className="hidden md:block text-3xl">Make Your Dish</h1>
          </div>

          {account ? (
            <div className="hidden md:flex items-center justify-center">
              <Link href={`/accounts/${account.id}`}>
                <a
                  className={`${buttonStyle} flex items-center justify-center mr-3`}
                >
                  <FaUserAlt className="mr-2" />
                  <p>{account.userName}</p>
                </a>
              </Link>
              <button
                onClick={signOut}
                className={`${buttonStyle} flex items-center justify-center`}
              >
                <RiLogoutBoxFill className="text-2xl" />
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <a
                className={`${buttonStyle} hidden md:flex items-center justify-center`}
              >
                <FaUserAlt className="mr-2" />
                <p>Se connecter</p>
              </a>
            </Link>
          )}

          <FiMenu
            onClick={() => {
              mobileMenuVisible
                ? setMobileMenuVisible(false)
                : setMobileMenuVisible(true)
            }}
            className={`${
              headercolor === "food" ? "text-white" : "text-black"
            } md:hidden text-4xl`}
          />
        </div>
      </header>
      {mobileMenuVisible && (
        <NavMobile
          account={account}
          signOut={signOut}
          buttonStyle={buttonStyle}
          headercolor={headercolor}
        />
      )}
    </>
  )
}

export default Header
