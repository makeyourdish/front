import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdminUserForm from "../../../../src/components/admin/AdminUserForm"

const ModifyUserAdministrationPage = () => {
  const {
    query: { userId },
  } = useRouter()

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api
        .get(`/users/${userId}`) // todo: edit this when exist
        .then((response) => setUser(response.data))
        .catch((err) => {
          setError(err.message)
        })
        .then(() => setLoading(false))
    }
  }, [userId])

  return (
    <Layout
      page="Administration / Modifier un utilisateur"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        {Object.keys(user).length
          ? `Modifier l'utilisateur "${user.userName}"`
          : "Modifier un utilisateur"}
      </h2>
      <AdminUserForm user={user} loading={loading} error={error} />
    </Layout>
  )
}

// ModifyUserAdministrationPage.private = true // todo: edit this when signin exist
// ModifyUserAdministrationPage.administration = true // todo: edit this when signin exist

export default ModifyUserAdministrationPage
