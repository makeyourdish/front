import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props

  const [session, setSession] = useState()
  const [signInError, setSignInError] = useState(null)
  const [signUpError, setSignUpError] = useState(null)

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      setSession(null)

      return
    }

    const [, payload] = jwt.split(".")
    const session = atob(payload)

    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    initSession(jwt)
  }, [initSession])

  useEffect(() => {
    // Redirects the user if he's not logged in and if the page is private
    if (session === null && Page.private) {
      router.push(`/signin?redirect=${encodeURIComponent(router.asPath)}`)
    }
  }, [Page.private, router, session])

  useEffect(() => {
    // Redirects the user if he's logged in and if the page is only available non-logged-in users (signin and signup pages).
    if (session !== null && session !== undefined && Page.noSessionOnly) {
      router.push("/")
    }
  }, [Page.noSessionOnly, router, session])

  useEffect(() => {
    // Redirects the user if he's not logged or not administrator in and if the page is only accessible for administrators
    if (session && Page.administration) {
      const isAdmin = JSON.parse(session).isAdmin

      if (!isAdmin) {
        router.push("/")
      }
    }
  }, [Page.administration, router, session])

  const signIn = useCallback(
    async (mail, password) => {
      try {
        const { data } = await api.post("auth/connection", {
          mail,
          password,
        })
        setSignInError(null) // remove signin error message
        localStorage.setItem("jwt", data)
        const {
          query: { redirect }, // get redirect param from url if exist
        } = router

        if (redirect) {
          router.push(decodeURIComponent(redirect))
        } else {
          router.push("/")
        }

        initSession(data) // run session with jwt
      } catch (err) {
        if (err.response.status === 404) {
          err.response.data = { error: "Email incorrect" }
        }

        setSignInError(err.response.data.error)
      }
    },
    [initSession, router]
  )

  const signUp = useCallback(
    async (mail, password) => {
      try {
        await api.post("auth/inscription", { mail, password })
        router.push("/signin")
        setSignUpError(null) // remove signup error message
      } catch (err) {
        setSignUpError(err.response.data.error) // remove signup error message
      }
    },
    [router]
  )

  const signOut = () => {
    localStorage.removeItem("jwt")
    localStorage.setItem("cart", JSON.stringify([]))
    setSession(null)
    router.push("/signin")
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        router,
        session,
        signInError,
        signUpError,
        signIn,
        signUp,
        signOut,
      }}
    />
  )
}

export default AppContext