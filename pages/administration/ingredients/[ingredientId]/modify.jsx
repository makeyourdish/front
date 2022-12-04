import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdminIngredientForm from "../../../../src/components/admin/AdminIngredientForm"

const ModifyIngredientAdministrationPage = () => {
  const {
    query: { ingredientId },
  } = useRouter()

  const [ingredient, setIngredient] = useState({})
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
      <AdminIngredientForm
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
