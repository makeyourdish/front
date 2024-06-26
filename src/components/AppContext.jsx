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
      const isAdmin = JSON.parse(session).payload.userAdmin

      if (!isAdmin) {
        router.push("/")
      }
    }
  }, [Page.administration, router, session])

  const signIn = useCallback(
    async (email, password) => {
      try {
        const { data } = await api.post("/sign-in", {
          email,
          password,
        })
        setSignInError(null) // remove signin error message
        localStorage.setItem("jwt", data.token)
        const {
          query: { redirect }, // get redirect param from url if exist
        } = router

        if (redirect) {
          //router.push(decodeURIComponent(redirect))
          router.push("/")
        } else {
          router.push("/")
        }

        initSession(data.token) // run session with jwt
      } catch (err) {
        if (err.message === "Network Error") {
          setSignInError(
            "Contactez l'administrateur du site (Pierre MARQUET 06.69.69.69.69 ❤️) "
          )

          return
        }

        setSignInError(err.response.data)
      }
    },
    [initSession, router]
  )

  const signUp = useCallback(
    async (userName, email, password) => {
      try {
        await api.post("/sign-up", { userName, email, password })
        router.push("/signin")
        setSignUpError(null) // remove signup error message
      } catch (err) {
        if (err.message === "Network Error") {
          setSignUpError(
            "Contactez l'administrateur du site (Romain BIDAULT 06.34.50.34.50 ❤️) "
          )

          return
        }

        setSignUpError(err.response.data) // remove signup error message
      }
    },
    [router]
  )

  const signOut = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("ingredients")
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
