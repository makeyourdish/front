import { useEffect, useState } from "react"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdminUserList from "../../src/components/admin/AdminUserList"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((err) => {
        setError(err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout page="Administration" hideheader={+true} diplayadminheader={+true}>
      <h2 className="text-center ">Liste des utilisateurs</h2>
      <AdminUserList users={users} loading={loading} error={error} />
    </Layout>
  )
}

export default Users
