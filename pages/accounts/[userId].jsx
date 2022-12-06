import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"

const AccountPage = () => {
  const [user, setUser] = useState(null) //the user to display
  const { session } = useContext(AppContext)
  let account = null //the login user

  if (session) {
    account = JSON.parse(session).payload
  }

  const {
    query: { userId },
  } = useRouter()

  useEffect(() => {
    if (userId) {
      api.get(`/accounts/${userId}`).then((response) => {
        setUser(response.data)
      })
    }
  }, [userId])

  return (
    <Layout page={`Profil: ${userId}`} pagetheme="food" screensize={+true}>
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

export default AccountPage
