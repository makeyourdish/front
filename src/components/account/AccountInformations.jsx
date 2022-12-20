import Link from "next/link"
import { useRouter } from "next/router"
import { ImSad2 } from "react-icons/im"
import Loader from "../Loader"

const UserInformations = ({ userId, tokenInfos, loading, apiError, user }) => {
  const router = useRouter()

  const buttonStyle =
    "bg-white text-center px-9 py-2 md:px-12 md:py-3 md:text-lg secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  if (userId && tokenInfos && userId != tokenInfos.userId) {
    return router.push(`/accounts/${tokenInfos.userId}`)
  }

  if (loading) {
    return (
      <section className="flex items-center justify-center flex-grow">
        <Loader color="color" message="Chargement des informations du compte" />
      </section>
    )
  }

  if (apiError) {
    return (
      <section className="flex items-center justify-center flex-grow">
        <div className="w-full mb-7 py-2 flex items-center justify-center text-center font-bold text-2xl rounded">
          <ImSad2 className="text-5xl mr-3" /> {apiError}
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center flex-grow">
      <h2 className="text-2xl md:text-4xl mb-12 secondary-font">
        Mes informations
      </h2>

      <div className="tertiary-font text-center text-xl md:text-2xl mb-12">
        <p className="mb-4">
          Nom d'utilisateur : <b>{user.userName}</b>
        </p>
        <p className="mb-4">
          Mail : <b>{user.email}</b>
        </p>
      </div>

      <div className="flex flex-col md:flex-row z-30">
        <Link href="/recipes/make">
          <a className={`${buttonStyle} mb-4 md:mb-0 md:mr-4`}>
            Modifier mes informations
          </a>
        </Link>
        <Link href="/recipes/make">
          <a className={`${buttonStyle} mb-4 md:mb-0 md:mr-4`}>
            Modifier mon mot de passe
          </a>
        </Link>
      </div>
    </section>
  )
}

export default UserInformations
