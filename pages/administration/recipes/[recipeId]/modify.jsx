import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationRecipeForm from "../../../../src/components/admin/AdministrationRecipeForm"

const ModifyrecipeAdministrationPage = () => {
  const {
    query: { recipeId },
  } = useRouter()

  const [recipe, setRecipe] = useState({
    id: 1,
    name: "Le nom de la recette",
    personNb: 2,
    description: "La description de la recette",
    imageUrl:
      "https://www.google.fr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    preparationTime: "01h30",
    step: "Etape 1;Etape 2;Etape 3;Etape 4;Etape 5",
    priceRange: 4,
    difficulty: 3,
    published: false,
    recipeTypeId: 2,
    createdAt: "2022-12-12T13:52:39.401Z",
    updatedAt: "2022-12-12T13:52:39.401Z",
    ingredients: [
      {
        id: 3,
        quantity: 3,
        quantityType: null,
        recipeId: 1,
        ingredientId: 3,
        ingredient: {
          id: 3,
          name: "Bacon",
          imageUrl: null,
          categoryIngredientsId: 1,
        },
      },
      {
        id: 2,
        quantity: 1,
        quantityType: "kg",
        recipeId: 1,
        ingredientId: 2,
        ingredient: {
          id: 2,
          name: "Salade",
          imageUrl: null,
          categoryIngredientsId: 1,
        },
      },
    ],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    if (recipeId && !isNaN(recipeId)) {
      api
        .get(`/recipes/${recipeId}`) // todo: edit this when exist
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

// ModifyrecipeAdministrationPage.private = true
// ModifyrecipeAdministrationPage.administration = true

export default ModifyrecipeAdministrationPage
