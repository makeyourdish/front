import Layout from "../../../src/components/Layout"
import AdministrationRecipeForm from "../../../src/components/admin/AdministrationRecipeForm"

const AddRecipeAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter une recette ou un cocktail"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Ajouter une recette ou un cocktail
      </h2>
      <AdministrationRecipeForm />
    </Layout>
  )
}

AddRecipeAdministrationPage.private = true
AddRecipeAdministrationPage.administration = true

export default AddRecipeAdministrationPage
