import Image from "next/image"
import Link from "next/link"
import { Field, Form, Formik } from "formik"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"

const SpatuleImg = () => {
  const src = "/images/background/Spatule.png"
  const otherClass = "absolute top-12 right-12 lg:right-24"

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
  const otherClass = "absolute bottom-32 left-12"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={420} height={290} alt="food" />
      </div>
    </>
  )
}

const displayErrorSchema = Yup.object({
  email: Yup.string().email("Adresse mail invalide").required("Requis"),
  password: Yup.string().required("Requis"),
})

const Signin = () => {
  const { signIn, signInError } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      return signIn(email, password)
    },
    [signIn]
  )

  return (
    <Layout
      page="Se connecter"
      pagetheme="food"
      screensize={+true}
      hideheader={+true}
    >
      <div className="flex flex-col justify-between items-center h-screen relative">
        <div className="w-screen text-xl md:text-3xl text-center mt-10 md:mt-24">
          <Link href="/">
            <a>
              <h1>Make Your Dish</h1>
            </a>
          </Link>
          <h2 className="secondary-font">Se connecter</h2>
        </div>

        {signInError && (
          <p className="error-field text-red-700 text-xl font-bold">
            {signInError}
          </p>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={displayErrorSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="z-10 flex flex-col justify-center items-center w-5/6 md:w-1/2">
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-red-500"
                  name="email"
                  type="email"
                  placeholder="✉ Entrer votre email"
                ></Field>
                {touched.email && errors.email && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-red-500"
                  name="password"
                  type="password"
                  placeholder="🔒 Entrer votre mot de passe"
                ></Field>
                {touched.password && errors.password && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className=" bg-food-primary rounded-full tertiary-font text-white text-xl md:text-2xl py-3 px-12 shadow-lg transition-all hover:scale-105 hover:bg-red-300/75 focus:outline focus:outline-3 focus:outline-red-300"
              >
                Connectez-vous
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-screen flex flex-col md:flex-row items-center md:items-end pb-6 justify-end md:justify-center text-xl md:text-2xl text-center tertiary-font signin-flamme-background min-h-[250px] md:min-h-[280px]">
          <p className="mr-2">Vous n’avez pas de compte ?</p>
          <Link href="/signup">
            <a className="font-bold">Créer un compte</a>
          </Link>
        </div>
      </div>
      <SpatuleImg />
      <PoeleImg />
    </Layout>
  )
}

export default Signin
