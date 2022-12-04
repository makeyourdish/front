import Layout from "../../../src/components/Layout"
import AdminIngredientForm from "../../../src/components/admin/AdminIngredientForm"

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
      <AdminIngredientForm />
    </Layout>
  )
}

// AddIngredientAdministrationPage.private = true // todo: edit this when signin exist
// AddIngredientAdministrationPage.administration = true // todo: edit this when signin exist

export default AddIngredientAdministrationPage
