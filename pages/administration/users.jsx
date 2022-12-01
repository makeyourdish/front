import { useEffect, useState } from "react"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdministrationUserList from "../../src/components/admin/AdministrationUserList"

const UsersAdministrationPage = () => {
  const [users, setUsers] = useState([
    { id: 1, userName: "Sokou", email: "sokou@test.fr", isAdmin: true },
    { id: 2, userName: "Xeralya", email: "xeralya@test.fr", isAdmin: true },
    { id: 3, userName: "Hulcox", email: "hulcox@test.fr", isAdmin: true },
    { id: 4, userName: "Jojoka", email: "jojoka@test.fr", isAdmin: true },
    { id: 5, userName: "John", email: "johndoe@test.fr", isAdmin: false },
    { id: 6, userName: "Jane", email: "janedoe@test.fr", isAdmin: false },
    { id: 7, userName: "Bob", email: "bob@test.fr", isAdmin: false },
    { id: 8, userName: "Alice", email: "alice@test.fr", isAdmin: false },
    { id: 9, userName: "Jim", email: "jim@test.fr", isAdmin: false },
    { id: 10, userName: "Samantha", email: "samantha@test.fr", isAdmin: false },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("administration/users") // todo: edit this when exist
      .then((response) => setUsers(response.data))
      .catch((err) => {
        setError(err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout
      page="Gestion des utilisateurs"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-2xl font-bold my-10">
        Liste des utilisateurs
      </h2>
      <AdministrationUserList
        users={users}
        loading={loading}
        error={error}
        setUsers={setUsers}
      />
    </Layout>
  )
}

// UsersAdministrationPage.private = true // todo: edit this when exist
// UsersAdministrationPage.administration = true // todo: edit this when exist

export default UsersAdministrationPage
