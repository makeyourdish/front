import Link from "next/link"
import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { IoFastFood } from "react-icons/io5"
import { BiFoodMenu, BiDrink } from "react-icons/bi"
import Layout from "../src/components/Layout"

const AdministrationPage = () => {
  const [info, setInfo] = useState(null)

  return (
    <Layout page="Administration" hideheader={+true} diplayadminheader={+true}>
      <div className="flex flex-col items-center justify-center my-10 md:pb-10 md:border-b-2">
        <div className="flex flex-col md:flex-row items-center justify-center w-5/6 sm:w-4/6 md:w-2/3 xl:w-1/2">
          <Link href="/administration/users">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher les utilisateurs"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-full md:w-1/2 py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl   focus:outline-blue-500/75"
            >
              <FaUserCircle className="text-lg sm:text-3xl mr-2" />
              Gestion des utilisateurs
            </a>
          </Link>

          <Link href="/administration/ingredients">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher les ingrédients"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-full md:w-1/2 py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-blue-500/75"
            >
              <IoFastFood className="text-lg sm:text-3xl mr-2" />
              Gestion des ingrédients
            </a>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-5/6 sm:w-4/6 md:w-2/3 xl:w-1/2">
          <Link href="/administration/receipes">
            <a
              onMouseEnter={() => {
                setInfo("Ajouter, modifier, supprimer ou afficher les recettes")
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-full md:w-1/2 py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-blue-500/75"
            >
              <BiFoodMenu className="text-lg sm:text-3xl mr-2" />
              Gestion des recettes
            </a>
          </Link>

          <Link href="/administration/drinks">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher les cocktails"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-full md:w-1/2 py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-blue-500/75"
            >
              <BiDrink className="text-lg sm:text-3xl mr-2" />
              Gestion des cocktails
            </a>
          </Link>
        </div>
      </div>

      {info && (
        <div className="hidden md:block text-center text-2xl font-bold">
          {info}
        </div>
      )}
    </Layout>
  )
}

// AdministrationPage.private = true
// AdministrationPage.administration = true

export default AdministrationPage
