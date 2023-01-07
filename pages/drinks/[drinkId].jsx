import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../src/components/Layout"
import RecipeOrDrinkDetail from "../../src/components/RecipeOrDrinkDetail"
import api from "../../src/components/services/api"

const RecipeDetailPage = () => {
  const {
    query: { drinkId },
  } = useRouter()

  const [drink, setDrink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (drinkId && !isNaN(drinkId)) {
      api
        .get(`/recipe/${drinkId}`)
        .then((response) => {
          setDrink(response.data)
        })
        .catch((error) => {
          setApiError(error.response ? error.response.data : error.message)
        })
        .then(() => setLoading(false))
    }
  }, [drinkId])

  return (
    <Layout
      page={`Cocktail: ${drink?.name || "..."}`}
      pagetheme="drink"
      screensize={+true}
    >
      <RecipeOrDrinkDetail
        recipeOrDrink={drink}
        loading={loading}
        error={apiError}
      />
    </Layout>
  )
}

export default RecipeDetailPage
