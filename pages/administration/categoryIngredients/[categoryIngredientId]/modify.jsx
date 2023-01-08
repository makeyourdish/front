import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationCategoryIngredientForm from "../../../../src/components/admin/AdministrationCategoryIngredientForm"

const ModifyCategoryIngredientAdministrationPage = () => {
  const {
    query: { categoryIngredientId },
  } = useRouter()

  const [categoryIngredient, setIngredient] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (categoryIngredientId && !isNaN(categoryIngredientId)) {
      api
        .get(`/categoryIngredient/${categoryIngredientId}`)
        .then((response) => setIngredient(response.data))
        .catch((err) => {
          setError(err.response ? err.response.data : err.message)
        })
        .then(() => setLoading(false))
    }
  }, [categoryIngredientId])

  return (
    <Layout
      page="Administration / Modifier une categorie d'ingredient"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        {Object.keys(categoryIngredient).length
          ? `Modifier la category d'ingredient "${categoryIngredient.name}"`
          : "Modifier un categoryIngredient"}
      </h2>
      <AdministrationCategoryIngredientForm
        categoryIngredient={categoryIngredient}
        loading={loading}
        error={error}
      />
    </Layout>
  )
}

ModifyCategoryIngredientAdministrationPage.private = true
ModifyCategoryIngredientAdministrationPage.administration = true

export default ModifyCategoryIngredientAdministrationPage
