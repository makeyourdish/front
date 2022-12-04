import Layout from "../../../src/components/Layout"
import AdminUserForm from "../../../src/components/admin/AdminUserForm"

const AddUserAdministrationPage = () => {
  return (
    <Layout
      page="Administration / Ajouter un utilisateur"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-3xl underline font-bold my-10">
        Ajouter un utilisateur
      </h2>
      <AdminUserForm />
    </Layout>
  )
}

// AddUserAdministrationPage.private = true // todo: edit this when exist
// AddUserAdministrationPage.administration = true // todo: edit this when exist

export default AddUserAdministrationPage
