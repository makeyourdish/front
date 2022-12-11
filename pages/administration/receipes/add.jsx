import Layout from "../../../src/components/Layout"
import AdministrationReceipeForm from "../../../src/components/admin/AdministrationReceipeForm"

const AddReceipeAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter une recette ou un cocktail"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Ajouter une recette ou un cocktail
      </h2>
      <AdministrationReceipeForm />
    </Layout>
  )
}

// AddReceipeAdministrationPage.private = true // todo: edit this when signin exist
// AddReceipeAdministrationPage.administration = true // todo: edit this when signin exist

export default AddReceipeAdministrationPage
