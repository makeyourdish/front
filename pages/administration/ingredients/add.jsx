import Layout from "../../../src/components/Layout"
import AdministrationIngredientForm from "../../../src/components/admin/AdministrationIngredientForm"

const AddIngredientAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter un ingrédient"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Ajouter un ingrédient
      </h2>
      <AdministrationIngredientForm />
    </Layout>
  )
}

AddIngredientAdministrationPage.private = true
AddIngredientAdministrationPage.administration = true

export default AddIngredientAdministrationPage
