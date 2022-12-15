import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import AdministrationUserForm from "../../../../src/components/admin/AdministrationUserForm"

const ModifyUserAdministrationPage = () => {
  const {
    query: { userId },
  } = useRouter()

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api
        .get(`/userGetOne/${userId}`)
        .then((response) => setUser(response.data))
        .catch((err) => {
          setError(err)
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
      <AdministrationUserForm user={user} loading={loading} error={error} />
    </Layout>
  )
}

// ModifyUserAdministrationPage.private = true // todo: edit this when signin exist
// ModifyUserAdministrationPage.administration = true // todo: edit this when signin exist

export default ModifyUserAdministrationPage
