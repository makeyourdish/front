import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"

const Signup = () => {
  //const { signIn, signInError } = useContext(AppContext)
  const { signUp } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ username, email, password }) => {
      alert(`${username} ${email} ${password}`)

      return signUp(username, email, password)
    },
    [signUp]
  )

  return (
    <Layout
      page="Se connecter"
      pagetheme="drink"
      screensize={+true}
      hideheader={+true}
    >
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="w-screen text-3xl text-center mt-24">
          <h1>Make Your Dish</h1>
          <h2 className="secondary-font">Créer un Compte</h2>
        </div>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .required("Required")
              .min(3, "3 Character minimum!"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center items-center w-1/2">
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-red-500"
                  name="username"
                  type="username"
                  placeholder="👨‍⚕️ Enter your username"
                ></Field>
                {touched.username && errors.username && (
                  <div className="errorField mt-1 text-red-600 text-center">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-red-500"
                  name="email"
                  type="email"
                  placeholder="✉ Enter your Email"
                ></Field>
                {touched.email && errors.email && (
                  <div className="errorField mt-1 text-red-600 text-center">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-food-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-red-500"
                  name="password"
                  type="password"
                  placeholder="🔒 Enter your Password"
                ></Field>
                {touched.password && errors.password && (
                  <div className="errorField mt-1 text-red-600 text-center">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className=" bg-food-primary rounded-full tertiary-font text-white text-2xl py-3 px-12 shadow-lg transition-all hover:scale-105 hover:bg-red-300/75 focus:outline focus:outline-3 focus:outline-red-300"
              >
                S'inscrire
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-screen flex items-end pb-6 justify-center text-2xl text-center tertiary-font signin-flamme-background min-h-[280px]">
          <p className="mr-2">Vous avez déjà un compte ?</p>
          <Link href="/signin">
            <a className="font-bold">Se connecter</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
