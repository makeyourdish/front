/* eslint-disable @next/next/no-img-element */
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

const displayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string().required("Le nom de la categorie est requis"),
})

//* -------------------------- End validation schema --------------------------

const AdminIngredientForm = ({ categoryIngredient, loading, error }) => {
  const router = useRouter()
  const [responseError, setResponseError] = useState(null)

  const handleSubmit = useCallback(
    async ({ name, isCocktail }) => {
      categoryIngredient
        ? await api
            .put(`/categoryIngredient/${categoryIngredient.id}`, {
              name,
              isCocktail,
            })
            .then(() => router.push("/administration/categoryIngredients"))
            .catch((err) =>
              setResponseError(err.response ? err.response.data : err.message)
            )
        : await api
            .post("/categoryIngredient", {
              name,
              isCocktail,
            })
            .then(() => router.push("/administration/categoryIngredients"))
            .catch((err) =>
              setResponseError(err.response ? err.response.data : err.message)
            )
    },
    [router, categoryIngredient]
  )

  if (loading) {
    return <AdminLoader message="Chargement du formulaire" />
  }

  if (error) {
    return <AdminResponseError error={error} otherClass="mt-10" />
  }

  if (categoryIngredient && !Object.keys(categoryIngredient).length) {
    return <AdminResponseNotFound message="Ingrédient non trouvé" />
  }

  return (
    <Formik
      initialValues={{
        name: categoryIngredient ? categoryIngredient.name : "",
        isCocktail: categoryIngredient ? categoryIngredient.isCocktail : false,
      }}
      validationSchema={displayingErrorMessagesSchema}
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
                touched.name && errors.name && "border-red-600"
              }`}
              label="Nom de la catégorie d'ingrédient"
              name="name"
              placeholder="Le nom de la catégorie d'ingrédient"
            />
            {errors.name && touched.name && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.name}
              </div>
            )}
          </div>

          <label className="select-none cursor-pointer sm:text-xl flex items-center justify-center">
            <Field
              className="mr-2 cursor-pointer h-4 w-4 sm:h-5 sm:w-5"
              type="checkbox"
              name="isCocktail"
            />
            Afficher pour les plats et les cocktails
          </label>

          {categoryIngredient ? (
            <button
              type="submit"
              className="md:text-lg flex items-center justify-center mt-5 md:mt-10 p-3 md:p-5 bg-blue-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-blue-600/75"
            >
              <FaEdit className="text-xl md:text-3xl mr-2" /> Modifier la
              categorie d'ingrédient
            </button>
          ) : (
            <button
              type="submit"
              className="md:text-lg flex items-center justify-center mt-5 md:mt-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75"
            >
              <RiAddCircleFill className="text-xl md:text-3xl mr-2" /> Ajouter
              la categorie d'ingrédient
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default AdminIngredientForm
