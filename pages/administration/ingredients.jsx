import Link from "next/link"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdministrationIngredientsList from "../../src/components/admin/AdministrationIngredientsList"

const IngredientsAdministrationPage = () => {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/allIngredient")
      .then((response) => setIngredients(response.data))
      .catch((err) => {
        setError(err.response ? err.response.data : err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout
      page="Administration / Liste des ingredients"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Liste des ingredients
      </h2>
      <AdministrationIngredientsList
        ingredients={ingredients}
        loading={loading}
        error={error}
        setIngredients={setIngredients}
      />
      <Link href={"/administration/ingredients/add"} passHref>
        <button className="mb-12 mx-auto md:text-lg flex items-center justify-center my-5 md:my-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75">
          <RiAddCircleFill className="text-3xl mr-2" /> Ajouter un ingredient
        </button>
      </Link>
    </Layout>
  )
}

// IngredientsAdministrationPage.private = true // todo: edit this when signin exist
// IngredientsAdministrationPage.administration = true // todo: edit this when signin exist

export default IngredientsAdministrationPage
