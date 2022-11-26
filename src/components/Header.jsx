import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import AppContext from "../components/AppContext"
import useWindowDimensions from "../components/services/useWindowDimantions"
import { FaUserAlt } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import { RiLogoutBoxFill } from "react-icons/ri"

const HeaderNavContent = (props) => {
  const buttonStyle =
    "flex items-center mb-1 md:mb-0 md:ml-3 justify-center bg-white py-2 secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  return (
    <nav className={`${props.otherclass} w-full`}>
      <h1
        className={`${
          props.pagetheme === "food" ? "text-white" : "text-black"
        } text-center text-2xl sm:text-4xl mb-3 md:hidden`}
      >
        Make Your Dish
      </h1>

      {props.account ? (
        <div className="flex items-center justify-center flex-wrap">
          <Link href={`/accounts/${"props.account.id"}`}>
            <a
              className={`${buttonStyle} text-xs sm:text-xl px-3 mr-3 md:mr-0`}
            >
              <FaUserAlt className="mr-2" />
              <p>{"props.account.userName"}</p>
            </a>
          </Link>
          <button onClick={props.signOut} className={`${buttonStyle} px-3`}>
            <RiLogoutBoxFill className="text-lg sm:text-3xl" />
          </button>
        </div>
      ) : (
        <Link href="/signin">
          <a className={`${buttonStyle} text-xs sm:text-xl px-6 sm:px-12`}>
            <FaUserAlt className="mr-2" />
            <p>Se connecter</p>
          </a>
        </Link>
      )}
    </nav>
  )
}

const HeaderNavMobile = ({ pagetheme, account, signOut }) => {
  return (
    <nav
      className={`${
        pagetheme === "food" ? "bg-food-primary" : "bg-drink-primary"
      } `}
    >
      <HeaderNavContent
        pagetheme={pagetheme}
        signOut={signOut}
        account={account}
        otherclass="flex flex-col items-center justify-center"
      />
    </nav>
  )
}

const Header = ({ pagetheme }) => {
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

  // props.pagetheme : change the color of header : "drink" or "food"
  return (
    <header
      className={`${pagetheme === "food" && "bg-food-primary"} ${
        pagetheme === "drink" && "bg-drink-primary"
      } py-2 px-8 md:px-5 md:py-4 w-full rounded-b-3xl drop-shadow-md mb-2`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`${
            pagetheme === "food" ? "text-white" : "text-black"
          } flex items-center justify-center`}
        >
          <p className="md:mr-5">LOGO</p>
          <h1 className="hidden md:block text-3xl">Make Your Dish</h1>
        </div>
        <HeaderNavContent
          pagetheme={pagetheme}
          signOut={signOut}
          account={account}
          otherclass="hidden md:w-max md:flex  md:items-center md:justify-center"
        />
        <FiMenu
          onClick={() => {
            mobileMenuVisible
              ? setMobileMenuVisible(false)
              : setMobileMenuVisible(true)
          }}
          className={`${
            pagetheme === "food" ? "text-white" : "text-black"
          } md:hidden cursor-pointer text-4xl`}
        />
      </div>

      {/* 🔽🔽🔽 Menu for mobile 🔽🔽🔽 */}
      {mobileMenuVisible && (
        <HeaderNavMobile
          account={account}
          signOut={signOut}
          buttonStyle={buttonStyle}
          pagetheme={pagetheme}
        />
      )}
    </header>
  )
}

export default Header
