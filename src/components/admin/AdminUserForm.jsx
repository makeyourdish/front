import { useCallback, useContext } from "react"
import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import { Oval } from "react-loader-spinner"
import { RiAddCircleFill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import AppContext from "../AppContext"
import api from "../services/api"
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi"

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
  const { router } = useContext(AppContext)

  const handleSubmit = useCallback(
    async ({ userName, email, password, isAdmin }) => {
      user
        ? await api.put(`/users/${user.id}`, {
            userName,
            email,
            password,
            isAdmin,
          })
        : await api.post("/users", { userName, email, password, isAdmin })
      router.push("/administration/users")
    },
    [router, user]
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Oval
          height={60}
          width={60}
          color={"slateblue"}
          secondaryColor={"slateblue"}
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
        <p className="font-bold text-xl ml-3">Chargement du formulaire... ⌛</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-10 p-5 bg-red-200 rounded-lg mx-12">
        <p className="text-3xl font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-5xl mr-3" />
          {error}
        </p>
      </div>
    )
  }

  if (!Object.keys(user).length) {
    return (
      <div className="flex items-center justify-center mt-10 p-5 bg-yellow-200 rounded-lg mx-12">
        <p className="text-3xl font-bold flex items-center justify-center text-yellow-600">
          <FiAlertCircle className="text-5xl mr-3" />
          Utilisateur non trouvé
        </p>
      </div>
    )
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
        <Form className="w-1/2 p-12 border mx-auto flex flex-col items-center justify-center rounded">
          <div className="mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all outline-none outline-offset-0 focus:outline-3 focus:outline-slate-600/75 ${
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

          <div className="mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all outline-none outline-offset-0 focus:outline-3 focus:outline-slate-600/75 ${
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

          <div className="mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all outline-none outline-offset-0 focus:outline-3 focus:outline-slate-600/75 ${
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

          <label className="mb-5 select-none cursor-pointer text-xl flex items-center justify-center">
            <Field
              className="mr-2 cursor-pointer h-5 w-5"
              type="checkbox"
              name="isAdmin"
            />
            Administrateur
          </label>

          {user ? (
            <button
              type="submit"
              className="text-lg flex items-center justify-center mt-10 p-5 bg-blue-600 text-white rounded-lg transition-all hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-blue-600/75"
            >
              <FaEdit className="text-3xl mr-2" /> Modifier l'utilisateur
            </button>
          ) : (
            <button
              type="submit"
              className="text-lg flex items-center justify-center mt-10 p-5 bg-green-600 text-white rounded-lg transition-all hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-green-600/75"
            >
              <RiAddCircleFill className="text-3xl mr-2" /> Ajouter
              l'utilisateur
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default AdminUserForm
