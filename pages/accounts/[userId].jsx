import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import { FiAlertTriangle } from "react-icons/fi"
import Link from "next/link"

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
            <FiAlertTriangle className="text-5xl mr-3" />
            Veuillez vous connecter
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

  const buttonStyle =
    "bg-white text-center px-9 py-2 md:px-12 md:py-3 md:text-xl secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  return (
    <Layout page={`Profil: ${userId}`} pagetheme="food" screensize={+true}>
      <div className="flex flex-col justify-between items-center h-screen">
        {/* <AccountPageContent user={user} account={account} /> <- */}
        {user?.userId === account?.userId || account.userAdmin ? (
          <div>
            <div className="my-10 text-3xl md:text-3xl text-center md:mt-24">
              <h2 className="secondary-font">Mes informations</h2>
            </div>

            <div className="tertiary-font text-center text-lg">
              <p className="mb-4">
                Nom d'utilisateur: <b>{user.userName}</b>
              </p>
              <p className="mb-4">
                Mail: <b>{user.userEmail}</b>
              </p>
              {/*<p className="mb-4">Id: {user.userId}</p>
            <p className="">IsAdmin: {user.userAdmin.toString()}</p> */}
            </div>

            <div className="flex flex-col md:flex-row z-30">
              <Link href="/recipes/make">
                <a className={`${buttonStyle} mb-4 md:mb-0 md:mr-4`}>
                  Modifier mes informations
                </a>
              </Link>
              <br></br>
              <Link href="/recipes/make">
                <a className={`${buttonStyle} mb-4 md:mb-0 md:mr-4`}>
                  Modifier mon mot de passe
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <h2>Vous n'etes pas autorisé</h2>
        )}
        <div className="w-screen flex flex-col md:flex-row items-center md:items-end pb-6 justify-end md:justify-center text-xl md:text-2xl text-center tertiary-font signin-flamme-background min-h-[250px] md:min-h-[280px]"></div>
      </div>
    </Layout>
  )
}

//AccountPage.private = true

export default AccountPage
