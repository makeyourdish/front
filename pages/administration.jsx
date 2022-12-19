import Link from "next/link"
import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { IoFastFood } from "react-icons/io5"
import { BiFoodMenu } from "react-icons/bi"
import Layout from "../src/components/Layout"

const AdministrationPage = () => {
  const [info, setInfo] = useState(null)

  return (
    <Layout page="Administration" hideheader={+true} diplayadminheader={+true}>
      <div className="flex flex-col items-center justify-center my-10 md:pb-10 md:border-b-2 px-2 sm:px-10 md:px-24 xl:px-52 2xl:px-80">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
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
              className="flex items-center justify-center rounded-lg w-full py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-blue-500/75"
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
              className="flex items-center justify-center rounded-lg w-full py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-blue-500/75"
            >
              <BiFoodMenu className="text-lg sm:text-3xl mr-2" />
              Gestion des ingrédients
            </a>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <Link href="/administration/recipes">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher les recettes et cocktails"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center rounded-lg w-full py-4 m-3 text-sm sm:text-lg bg-blue-500 text-white transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-blue-500/75"
            >
              <IoFastFood className="text-lg sm:text-3xl mr-2" />
              Gestion des recettes et des cocktails
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
