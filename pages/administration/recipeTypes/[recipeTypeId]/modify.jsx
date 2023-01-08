import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationRecipeTypeForm from "../../../../src/components/admin/AdministrationRecipeTypeForm"

const ModifyCategoryIngredientAdministrationPage = () => {
  const {
    query: { recipeTypeId },
  } = useRouter()

  const [recipeType, setRecipeType] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (recipeTypeId && !isNaN(recipeTypeId)) {
      api
        .get(`/recipeType/${recipeTypeId}`)
        .then((response) => setRecipeType(response.data))
        .catch((err) => {
          setError(err.response ? err.response.data : err.message)
        })
        .then(() => setLoading(false))
    }
  }, [recipeTypeId])

  return (
    <Layout
      page="Administration / Modifier une categorie d'ingredient"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        {Object.keys(recipeType).length
          ? `Modifier la category d'ingredient "${recipeType.name}"`
          : "Modifier un categoryIngredient"}
      </h2>
      <AdministrationRecipeTypeForm
        recipeType={recipeType}
        loading={loading}
        error={error}
      />
    </Layout>
  )
}

ModifyCategoryIngredientAdministrationPage.private = true
ModifyCategoryIngredientAdministrationPage.administration = true

export default ModifyCategoryIngredientAdministrationPage
