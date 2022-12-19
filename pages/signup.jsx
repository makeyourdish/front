import { Field, Form, Formik } from "formik"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"

const displayErrorSchema = Yup.object({
  username: Yup.string().required("Requis").min(3, "3 caractères minimum!"),
  email: Yup.string().email("Adresse mail invalide").required("Requis"),
  password: Yup.string()
    .min(6, "Dois contenir au moins 6 caractères")
    .matches(
      /^.*(?=.*[a-z]).*$/g,
      "Le mot de passe doit contenir au moins 1 minuscule"
    )
    .matches(
      /^.*(?=.*[A-Z]).*$/g,
      "Le mot de passe doit contenir au moins 1 majuscule"
    )
    .matches(
      /^.*(?=.*[0-9]).*$/g,
      "Le mot de passe doit contenir au moins 1 nombre"
    )
    .required("Requis"),
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passes ne correspondent pas"
    )
    .required("Requis"),
})

const Signup = () => {
  const { signUp, signUpError } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ username, email, password }) => {
      return signUp(username, email, password)
    },
    [signUp]
  )

  return (
    <Layout
      page="Inscription"
      pagetheme="drink"
      screensize={+true}
      hideheader={+true}
    >
      <div className="flex flex-col justify-between items-center h-screen overflow-hidden">
        <div className="w-screen text-3xl text-center mt-24">
          <Link href="/">
            <a>
              <h1>Make Your Dish</h1>
            </a>
          </Link>
          <h2 className="secondary-font">S'inscrire</h2>
        </div>

        {signUpError && (
          <p className="text-red-700 text-xl font-bold error-field">
            {signUpError}
          </p>
        )}

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={displayErrorSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="z-10 flex flex-col justify-center items-center w-1/2">
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-drink-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-yellow-500"
                  name="username"
                  placeholder="👨‍⚕️ Entrer un pseudo"
                ></Field>
                {touched.username && errors.username && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-drink-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-yellow-500"
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

              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-drink-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-yellow-500"
                  name="password"
                  type="password"
                  placeholder="🔒 Entrer un mot de passe"
                ></Field>
                {touched.password && errors.password && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <Field
                  className="text-center py-3 w-full rounded-full border-drink-primary border-4 text-xl tertiary-font transition-all focus:outline focus:outline-3 focus:outline-yellow-500"
                  name="passwordConfirm"
                  type="password"
                  placeholder="🔒 Confirmer le mot de passe"
                ></Field>
                {touched.passwordConfirm && errors.passwordConfirm && (
                  <div className="error-field mt-1 text-red-600 text-center">
                    {errors.passwordConfirm}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-drink-primary rounded-full tertiary-font text-black text-2xl py-3 px-12 shadow-lg transition-all hover:scale-105 hover:bg-yellow-300/75 focus:outline focus:outline-3 focus:outline-yellow-5 00"
              >
                Créez votre compte
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-2/3 flex items-end pb-6 justify-center text-2xl text-center tertiary-font signup-ellips-background min-h-[280px]">
          <p className="z-10 mr-2">Vous avez déjà un compte ?</p>
          <Link href="/signin">
            <a className="z-10 font-bold">Se connecter</a>
          </Link>
          <div className="absolute left-0 bottom-0 flex items-end">
            <Image
              src="/images/background/FeuilleG.png"
              width={429}
              height={352}
              alt=""
            />
          </div>
          <div className="absolute right-0 bottom-0 flex items-end">
            <Image
              src="/images/background/FeuilleD.png"
              width={358}
              height={448}
              alt=""
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
