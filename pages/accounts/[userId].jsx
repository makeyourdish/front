import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AccountNav from "../../src/components/account/AccountNav"
import AccountInformations from "../../src/components/account/AccountInformations"

const SpatuleImg = () => {
  const src = "/images/background/Spatule.png"
  const otherClass = "absolute bottom-32 right-12 lg:right-44"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={200} height={200} alt="food" />
      </div>
    </>
  )
}

const PoeleImg = () => {
  const src = "/images/background/Poele.png"
  const otherClass = "absolute bottom-14 left-12"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={420 / 1.1} height={290 / 1.1} alt="food" />
      </div>
    </>
  )
}

const AccountPage = () => {
  const {
    query: { userId },
  } = useRouter()

  const { session } = useContext(AppContext)
  const [tokenInfos, setTokenInfos] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (session) {
      setTokenInfos(JSON.parse(session).payload)
    }
  }, [session])

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api
        .get(`/user/${userId}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          setApiError(error.response ? error.response.data : error.message)
        })
        .then(() => setLoading(false))
    }
  }, [userId])

  return (
    <Layout
      page={`Profil: ${user?.userName || "..."}`}
      pagetheme="food"
      screensize={+true}
    >
      <div className="flex-grow flex flex-col justify-center items-center relative tertiary-font">
        <div className="w-full flex-col md:flex-row flex-grow flex items-stretch justify-center z-10">
          <AccountNav pageSelected={1} />
          <AccountInformations
            userId={userId}
            tokenInfos={tokenInfos}
            loading={loading}
            apiError={apiError}
            user={user}
          />
        </div>
        <div className="w-screen signin-flamme-background min-h-[150px] md:min-h-[200px]"></div>
        <SpatuleImg />
        <PoeleImg />
      </div>
    </Layout>
  )
}

AccountPage.private = true

export default AccountPage
