import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationIngredientForm from "../../../../src/components/admin/AdministrationIngredientForm"

const ModifyIngredientAdministrationPage = () => {
  const {
    query: { ingredientId },
  } = useRouter()

  const [ingredient, setIngredient] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (ingredientId && !isNaN(ingredientId)) {
      api
        .get(`/ingredient/${ingredientId}`)
        .then((response) => setIngredient(response.data))
        .catch((err) => {
          setError(err.response ? err.response.data : err.message)
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

ModifyIngredientAdministrationPage.private = true
ModifyIngredientAdministrationPage.administration = true

export default ModifyIngredientAdministrationPage
