import Layout from "../../../src/components/Layout"
import AdministrationRecipeTypeForm from "../../../src/components/admin/AdministrationRecipeTypeForm"

const AddCategoryIngredientAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter un type de recette ou cocktail"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Ajouter un type de recette ou cocktail
      </h2>
      <AdministrationRecipeTypeForm />
    </Layout>
  )
}

AddCategoryIngredientAdministrationPage.private = true
AddCategoryIngredientAdministrationPage.administration = true

export default AddCategoryIngredientAdministrationPage
