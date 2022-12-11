import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationIngredientForm from "../../../../src/components/admin/AdministrationIngredientForm"

const ModifyIngredientAdministrationPage = () => {
  const {
    query: { ingredientId },
  } = useRouter()

  const [ingredient, setIngredient] = useState({
    id: 1,
    name: "Cuisse de poulet",
    imageUrl:
      "https://www.alimentarium.org/sites/default/files/media/image/2016-10/AL001-02%20tomate_0.jpg",
    categoryIngredientsId: 3,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    if (ingredientId && !isNaN(ingredientId)) {
      api
        .get(`/ingredients/${ingredientId}`) // todo: edit this when exist
        .then((response) => setIngredient(response.data))
        .catch((err) => {
          setError(err.message)
        })
        .then(() => setLoading(false))
    }
  }, [ingredientId])

  return (
    <Layout
      page="Administration / Modifier un ingredient"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        {Object.keys(ingredient).length
          ? `Modifier l'ingredient "${ingredient.name}"`
          : "Modifier un ingredient"}
      </h2>
      <AdministrationIngredientForm
        ingredient={ingredient}
        loading={loading}
        error={error}
      />
    </Layout>
  )
}

// ModifyIngredientAdministrationPage.private = true
// ModifyIngredientAdministrationPage.administration = true

export default ModifyIngredientAdministrationPage
