import Link from "next/link"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdministrationUserList from "../../src/components/admin/AdministrationUserList"

const UsersAdministrationPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/users") // todo: edit this when database exist
      .then((response) => setUsers(response.data))
      .catch((err) => {
        setError(err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout
      page="Administration / Liste des utilisateurs"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Liste des utilisateurs
      </h2>
      <AdministrationUserList
        users={users}
        loading={loading}
        error={error}
        setUsers={setUsers}
      />
      <Link href={"/administration/users/add"} passHref>
        <button className="mx-auto md:text-lg flex items-center justify-center my-5 md:my-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-green-600/75">
          <RiAddCircleFill className="text-3xl mr-2" /> Ajouter un utilisateur
        </button>
      </Link>
    </Layout>
  )
}

// UsersAdministrationPage.private = true // todo: edit this when signin exist
// UsersAdministrationPage.administration = true // todo: edit this when signin exist

export default UsersAdministrationPage
