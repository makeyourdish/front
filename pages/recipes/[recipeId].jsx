import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../src/components/Layout"
import RecipeOrDrinkDetail from "../../src/components/RecipeOrDrinkDetail"
import api from "../../src/components/services/api"

const RecipeDetailPage = () => {
  const {
    query: { recipeId },
  } = useRouter()

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (recipeId && !isNaN(recipeId)) {
      api
        .get(`/recipe/${recipeId}`)
        .then((response) => {
          setRecipe(response.data)
        })
        .catch((error) => {
          setApiError(error.response ? error.response.data : error.message)
        })
        .then(() => setLoading(false))
    }
  }, [recipeId])

  return (
    <Layout
      page={`Recette: ${recipe?.name || "..."}`}
      pagetheme="food"
      screensize={+true}
    >
      <RecipeOrDrinkDetail
        recipeOrDrink={recipe}
        loading={loading}
        error={apiError}
      />
    </Layout>
  )
}

export default RecipeDetailPage
