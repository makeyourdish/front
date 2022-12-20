import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationRecipeForm from "../../../../src/components/admin/AdministrationRecipeForm"

const ModifyrecipeAdministrationPage = () => {
  const {
    query: { recipeId },
  } = useRouter()

  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (recipeId && !isNaN(recipeId)) {
      api
        .get(`/recipe/${recipeId}`)
        .then((response) => setRecipe(response.data))
        .catch((err) => {
          setError(err.response ? err.response.data : err.message)
        })
        .then(() => setLoading(false))
    }
  }, [recipeId])

  return (
    <Layout
      page="Administration / Modifier une recette"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        {Object.keys(recipe).length
          ? `Modifier la recette "${recipe.name}"`
          : "Modifier une recette"}
      </h2>
      <AdministrationRecipeForm
        recipe={recipe}
        loading={loading}
        error={error}
      />
    </Layout>
  )
}

ModifyrecipeAdministrationPage.private = true
ModifyrecipeAdministrationPage.administration = true

export default ModifyrecipeAdministrationPage
