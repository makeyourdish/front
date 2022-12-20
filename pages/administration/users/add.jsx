import Layout from "../../../src/components/Layout"
import AdministrationUserForm from "../../../src/components/admin/AdministrationUserForm"

const AddUserAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter un utilisateur"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Ajouter un utilisateur
      </h2>
      <AdministrationUserForm />
    </Layout>
  )
}

AddUserAdministrationPage.private = true
AddUserAdministrationPage.administration = true

export default AddUserAdministrationPage
