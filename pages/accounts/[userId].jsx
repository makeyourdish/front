import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import { FiAlertTriangle } from "react-icons/fi"

const AccountPage = () => {
  const [user, setUser] = useState(null) //the user to display
  const { session } = useContext(AppContext)
  const [apiError, setApiError] = useState(null)
  let account = null //the login user

  const {
    query: { userId },
  } = useRouter()

  if (session) {
    account = JSON.parse(session).payload
  }

  console.log("userId", userId)
  useEffect(() => {
    if (account && !isNaN(userId)) {
      api
        .get(`/accounts/${userId}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.log("error :>> ", error.response)
          setApiError(error.response ? error.response.data : error.message)
        })
    }
  }, [userId])

  if (!account) {
    return (
      <Layout page={`Profil: ${userId}`} pagetheme="food" screensize={+true}>
        <section>
          <div className="w-full mb-7 py-2 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
            <FiAlertTriangle className="text-5xl mr-3" /> Veuillez vous
            connecter
          </div>
        </section>
      </Layout>
    )
  }
  if (apiError) {
    return (
      <Layout page={`Profil: ${userId}`} pagetheme="food" screensize={+true}>
        <section>
          <div className="w-full mb-7 py-2 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
            <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout page={`Profil: ${userId}`} pagetheme="food" screensize={+true}>
      {/* <AccountPageContent user={user} account={account} /> <- */}
      {user?.userId === account?.userId || account.userAdmin ? (
        <div>
          <ul>
            <li>
              Id: <span>{user?.userId}</span>
            </li>
            <li>
              Email: <span>{user?.userEmail}</span>
            </li>
            <li>
              UserName: <span>{user?.userName}</span>
            </li>
            <li>
              IsAdmin: <span>{user?.userAdmin.toString()}</span>
            </li>
          </ul>
        </div>
      ) : (
        <h2>Vous n'etes pas autorisé</h2>
      )}
    </Layout>
  )
}

//AccountPage.private = true

export default AccountPage
