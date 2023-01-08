import { Field, Form, Formik } from "formik"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import { ImSad2 } from "react-icons/im"
import * as Yup from "yup"
import AppContext from "../../../src/components/AppContext"
import Layout from "../../../src/components/Layout"
import Loader from "../../../src/components/Loader"
import api from "../../../src/components/services/api"

const displayErrorSchema = Yup.object({
  userName: Yup.string().required("Requis").min(3, "3 caractères minimum!"),
  email: Yup.string().email("Adresse mail invalide").required("Requis"),
})

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

const UpdateAccountInfos = () => {
  const {
    query: { userId },
  } = useRouter()

  const { session, signOut } = useContext(AppContext)
  const [tokenInfos, setTokenInfos] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [responseError, setResponseError] = useState(null)

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

  const handleFormSubmit = useCallback(
    async ({ userName, email }) => {
      await api
        .put(`/user/${user.id}`, {
          userName,
          email,
        })
        .then(() => {
          signOut()
        })
        .catch((err) =>
          setResponseError(err.response ? err.response.data : err.message)
        )
    },
    [signOut, user?.id]
  )

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

  if (loading) {
    return (
      <Layout
        page="Modifier mes informations"
        pagetheme="food"
        screensize={+true}
      >
        <section className="flex items-center justify-center flex-grow">
          <Loader
            color="color"
            message="Chargement du formulaire de modification"
          />
        </section>
      </Layout>
    )
  }

  if (Number(userId) !== tokenInfos.userId) {
    return (
      <Layout
        page="Modifier mes informations"
        pagetheme="food"
        screensize={+true}
      >
        <section className="flex items-center justify-center flex-grow">
          <div className="w-full mb-7 py-2 flex items-center justify-center text-center font-bold text-2xl rounded">
            <ImSad2 className="text-5xl mr-3" /> Vous n'avez pas accès à cette
            page
          </div>
        </section>
      </Layout>
    )
  }

  if (apiError) {
    return (
      <Layout
        page="Modifier mes informations"
        pagetheme="food"
        screensize={+true}
      >
        <section className="flex items-center justify-center flex-grow">
          <div className="w-full mb-7 py-2 flex items-center justify-center text-center font-bold text-2xl rounded">
            <ImSad2 className="text-5xl mr-3" /> {apiError}
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout
      page="Modifier mes informations"
      pagetheme="food"
      screensize={+true}
    >
      <div className="flex flex-grow flex-col justify-between items-center relative overflow-hidden">
        <div className="w-screen text-xl md:text-3xl text-center mt-10 md:mt-24">
          <Link href="/">
            <a>
              <h1>Make Your Dish</h1>
            </a>
          </Link>
          <h2 className="secondary-font">Modifier mes informations</h2>
        </div>

        {responseError && (
          <p className="text-red-700 text-xl font-bold error-field">
            {responseError}
          </p>
        )}

        <Formik
          initialValues={{
            userName: tokenInfos.userName,
            email: tokenInfos.userEmail,
          }}
          validationSchema={displayErrorSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="z-10 flex flex-col justify-center items-center w-5/6 md:w-1/2 mb-10">
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-yellow-500"
                  name="userName"
                  placeholder="👨‍⚕️ Entrer un pseudo"
                ></Field>
                {touched.userName && errors.userName && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.userName}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-yellow-500"
                  name="email"
                  type="email"
                  placeholder="✉ Entrer un email"
                ></Field>
                {touched.email && errors.email && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.email}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className=" bg-food-primary rounded-full tertiary-font text-white text-xl md:text-2xl py-3 px-12 shadow-lg transition-all hover:scale-105 hover:bg-red-300/75 focus:outline focus:outline-3 focus:outline-red-300"
              >
                Modifier mes informations
              </button>
              <p className="text-lg tertiary-font mt-5 flex items-center justify-center bg-yellow-200 text-yellow-600 px-3 py-2 rounded-lg shadow-md">
                <FiAlertTriangle className="text-3xl mr-2" /> Après la
                modification, vous devrez vous reconnecter
              </p>
            </Form>
          )}
        </Formik>

        <div className="w-screen flex flex-col md:flex-row pb-6 items-center md:items-end justify-end md:justify-center text-xl md:text-2xl text-center tertiary-font signin-flamme-background min-h-[100px] lg:min-h-[150px]">
          <SpatuleImg />
          <PoeleImg />
        </div>
      </div>
    </Layout>
  )
}

UpdateAccountInfos.private = true

export default UpdateAccountInfos
