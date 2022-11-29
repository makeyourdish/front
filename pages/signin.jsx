import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"

const Signin = () => {
  //const { signIn, signInError } = useContext(AppContext)
  const { signIn } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      alert(`${email} ${password}`)

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
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="w-screen text-3xl text-center mt-24">
          <h1>Make Your Dish</h1>
          <h2 className="secondary-font">Connectez vous</h2>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
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
                Connectez-vous
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-screen flex items-end pb-6 justify-center text-2xl text-center tertiary-font signin-flamme-background min-h-[280px]">
          <p className="mr-2">Vous n’avez pas de compte ?</p>
          <Link href="/signup">
            <a className="font-bold">Créer un compte</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Signin
