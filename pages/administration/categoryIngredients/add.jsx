import Layout from "../../../src/components/Layout"
import AdministrationCategoryIngredientForm from "../../../src/components/admin/AdministrationCategoryIngredientForm"

const AddCategoryIngredientAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter un ingrédient"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Ajouter une catégorie d'ingrédient
      </h2>
      <AdministrationCategoryIngredientForm />
    </Layout>
  )
}

AddCategoryIngredientAdministrationPage.private = true
AddCategoryIngredientAdministrationPage.administration = true

export default AddCategoryIngredientAdministrationPage
