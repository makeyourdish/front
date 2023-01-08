import Link from "next/link"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdministrationRecipeTypesList from "../../src/components/admin/AdministrationRecipeTypesList"

const RecipeTypesAdministrationPage = () => {
  const [recipeTypes, setRecipeTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/allRecipeType")
      .then((response) => setRecipeTypes(response.data))
      .catch((err) => {
        setError(err.response ? err.response.data : err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout
      page="Administration / Liste des types de recettes et cocktails"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Liste des types de recettes et cocktails
      </h2>

      <AdministrationRecipeTypesList
        recipeTypes={recipeTypes}
        loading={loading}
        error={error}
        setRecipeTypes={setRecipeTypes}
      />

      <Link href={"/administration/recipeTypes/add"} passHref>
        <button className="mb-12 mx-auto md:text-lg flex items-center justify-center my-5 md:my-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75">
          <RiAddCircleFill className="text-3xl mr-2" /> Ajouter un type de
          recette ou cocktail
        </button>
      </Link>
    </Layout>
  )
}

RecipeTypesAdministrationPage.private = true
RecipeTypesAdministrationPage.administration = true

export default RecipeTypesAdministrationPage
