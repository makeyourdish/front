import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import { RiAddCircleFill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import api from "../services/api"
import AdminLoader from "./infos/AdminLoader"
import AdminResponseError from "./infos/AdminResponseError"
import AdminResponseNotFound from "./infos/AdminResponseNotFound"

//* -------------------- Validation schema for creation  --------------------
const displayingErrorMessagesSchemaForCreation = Yup.object().shape({
  userName: Yup.string().required("Le nom d'utilisateur est requis"),
  email: Yup.string()
    .email("Le mail est invalide")
    .required("Le mail est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir minimum 6 caractères")
    .max(50, "Le mot de passe doit contenir maximum 50 caractères")
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
      "Le mot de passe doit contenir au moins 1 chiffre"
    )
    .required("Le mot de passe est requis"),
})

//* -------------------- Validation schema for modification  -------------------
const displayingErrorMessagesSchemaForModification = Yup.object().shape({
  userName: Yup.string().required("Le nom d'utilisateur est requis"),
  email: Yup.string()
    .email("Le mail est invalide")
    .required("Le mail est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir minimum 6 caractères")
    .max(50, "Le mot de passe doit contenir maximum 50 caractères")
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
      "Le mot de passe doit contenir au moins 1 chiffre"
    ),
})
//* -------------------------- End validation schema --------------------------

const AdminUserForm = ({ user, loading, error }) => {
  const router = useRouter()
  const [responseError, setResponseError] = useState(null)

  const handleSubmit = useCallback(
    async ({ userName, email, password, isAdmin }) => {
      user
        ? await api
            .put(`/user/${user.id}`, {
              userName,
              email,
              password,
              isAdmin,
            })
            .then(() => router.push("/administration/users"))
            .catch((err) =>
              setResponseError(err.response ? err.response.data : err.message)
            )
        : await api
            .post("/user", { userName, email, password, isAdmin })
            .then(() => router.push("/administration/users"))
            .catch((err) =>
              setResponseError(err.response ? err.response.data : err.message)
            )
    },
    [router, user]
  )

  if (loading) {
    return <AdminLoader message="Chargement du formulaire" />
  }

  if (error) {
    return <AdminResponseError error={error} otherClass="mt-10" />
  }

  if (user && !Object.keys(user).length) {
    return <AdminResponseNotFound message="Utilisateur non trouvé" />
  }

  return (
    <Formik
      initialValues={{
        userName: user ? user.userName : "",
        email: user ? user.email : "",
        password: "",
        isAdmin: user ? user.isAdmin : false,
      }}
      validationSchema={
        user
          ? displayingErrorMessagesSchemaForModification
          : displayingErrorMessagesSchemaForCreation
      }
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="mb-12 w-5/6 md:w-4/5 lg:w-1/2 p-4 sm:p-8 md:p-12 border mx-auto flex flex-col items-center justify-center rounded">
          {responseError && (
            <AdminResponseError error={responseError} otherClass="mb-10" />
          )}
          <div className="mb-3 sm:mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                touched.userName && errors.userName && "border-red-600"
              }`}
              label="Pseudo"
              name="userName"
              placeholder="Le pseudo de l'utilisateur"
            />
            {errors.userName && touched.userName && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.userName}
              </div>
            )}
          </div>

          <div className="mb-3 sm:mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                touched.email && errors.email && "border-red-600"
              }`}
              label="Email"
              name="email"
              placeholder="exemple@mail.com"
            />
            {errors.email && touched.email && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-3 sm:mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                touched.password && errors.password && "border-red-600"
              }`}
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="1 majuscule, 1 minuscule, 1 chiffre, 6 caractères minimum et 50 caractères maximum"
            />
            {errors.password && touched.password && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.password}
              </div>
            )}
          </div>

          <label className="select-none cursor-pointer sm:text-xl flex items-center justify-center">
            <Field
              className="mr-2 cursor-pointer h-4 w-4 sm:h-5 sm:w-5"
              type="checkbox"
              name="isAdmin"
            />
            Administrateur
          </label>

          {user ? (
            <button
              type="submit"
              className="md:text-lg flex items-center justify-center mt-5 md:mt-10 p-3 md:p-5 bg-blue-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-blue-600/75"
            >
              <FaEdit className="text-xl md:text-3xl mr-2" /> Modifier
              l'utilisateur
            </button>
          ) : (
            <button
              type="submit"
              className="md:text-lg flex items-center justify-center mt-5 md:mt-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75"
            >
              <RiAddCircleFill className="text-xl md:text-3xl mr-2" /> Ajouter
              l'utilisateur
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default AdminUserForm
