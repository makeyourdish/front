import Link from "next/link"
import { FaKeycdn, FaUserCircle } from "react-icons/fa"
import { GiMeat } from "react-icons/gi"
import { BiDrink } from "react-icons/bi"

const AccountNav = ({ pageSelected }) => {
  return (
    <nav className="flex md:flex-col items-center justify-evenly md:justify-start px-5">
      <button
        className={`bg-food-primary md:bg-transparent text-white md:text-black px-4 py-4 rounded-full shadow-md md:rounded-none md:shadow-none mt-14 md:mt-12 md:px-10 md:py-5 md:border-b-2 md:border-black md:text-xl md:w-full ${
          pageSelected === 1 && "font-bold"
        }`}
      >
        <FaUserCircle className="md:hidden block text-2xl" />
        <p className="hidden md:block">Mes informations</p>
      </button>
      <button
        className={`bg-food-primary md:bg-transparent text-white md:text-black px-4 py-4 rounded-full shadow-md md:rounded-none md:shadow-none mt-14 md:mt-0 md:px-10 md:py-5 md:border-b-2 md:border-black md:text-xl md:w-full ${
          pageSelected === 2 && "font-bold"
        }`}
      >
        <GiMeat className="md:hidden block text-2xl" />
        <p className="hidden md:block">Mes recettes</p>
      </button>
      <button
        className={`bg-food-primary md:bg-transparent text-white md:text-black px-4 py-4 rounded-full shadow-md md:rounded-none md:shadow-none mt-14 md:mt-0 md:px-10 md:py-5 md:border-b-2 md:border-black md:text-xl md:w-full ${
          pageSelected === 3 && "font-bold"
        }`}
      >
        <BiDrink className="md:hidden block text-2xl" />
        <p className="hidden md:block">Mes cockails</p>
      </button>
      <Link href="/administration">
        <a className="bg-food-primary md:bg-transparent text-white md:text-black px-4 py-4 rounded-full shadow-md md:rounded-none md:shadow-none mt-14 md:mt-0 md:text-center md:py-5 md:border-b-2 md:border-black md:text-xl md:w-full">
          <FaKeycdn className="md:hidden block text-2xl" />
          <p className="hidden md:block">Administraton</p>
        </a>
      </Link>
    </nav>
  )
}

export default AccountNav
