/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
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
  name: Yup.string().required("Le nom de l'ingrédient est requis"),
  imageUrl: Yup.string().required("Vous devez ajouter une image"),
  categoryIngredientsId: Yup.string().required("Le champ est requis !"),
})

//* -------------------------- End validation schema --------------------------

const AdminIngredientForm = ({ ingredient, loading, error }) => {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [cotegoriesLoading, setCategoriesLoading] = useState(true)
  const [cotegoriesError, setCategoriesError] = useState(null)
  const [url, setUrl] = useState(ingredient ? ingredient.imageUrl : "")
  const [responseError, setResponseError] = useState(null)

  useEffect(() => {
    api
      .get("/allCategoryIngredient")
      .then((response) => setCategories(response.data))
      .catch((err) => {
        setCategoriesError(err.response ? err.response.data : err.message)
      })

      .then(() => setCategoriesLoading(false))
  }, [])

  const handleSubmit = useCallback(
    async ({ name, imageUrl, categoryIngredientsId }) => {
      ingredient
        ? await api
            .put(`/ingredient/${ingredient.id}`, {
              name,
              imageUrl,
              categoryIngredientsId: Number(categoryIngredientsId),
            })
            .then(() => router.push("/administration/ingredients"))
            .catch((err) =>
              setResponseError(err.response ? err.response.data : err.message)
            )
        : await api
            .post("/ingredient", {
              name,
              imageUrl,
              categoryIngredientsId: Number(categoryIngredientsId),
            })
            .then(() => router.push("/administration/ingredients"))
            .catch((err) =>
              setResponseError(err.response ? err.response.data : err.message)
            )
    },
    [router, ingredient]
  )

  if (loading || cotegoriesLoading) {
    return <AdminLoader message="Chargement du formulaire" />
  }

  if (error || cotegoriesError) {
    return (
      <AdminResponseError error={error || cotegoriesError} otherClass="mt-10" />
    )
  }

  if (!categories.length) {
    return (
      <AdminResponseError
        error="Vous devez créer au moins une catégorie"
        otherClass="mt-10"
      />
    )
  }

  if (ingredient && !Object.keys(ingredient).length) {
    return <AdminResponseNotFound message="Ingrédient non trouvé" />
  }

  return (
    <Formik
      initialValues={{
        name: ingredient ? ingredient.name : "",
        imageUrl: ingredient ? ingredient.imageUrl : "",
        categoryIngredientsId: ingredient
          ? ingredient.categoryIngredientsId
          : categories[0].id,
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
              label="Nom de l'ingrédient"
              name="name"
              placeholder="Le nom de l'ingrédient"
            />
            {errors.name && touched.name && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.name}
              </div>
            )}
          </div>

          <div className="mb-3 sm:mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                touched.imageUrl && errors.imageUrl && "border-red-600"
              }`}
              name="imageUrl"
              placeholder="L'url de l'image"
              onKeyUp={(e) => {
                setUrl(e.target.value)
              }}
            />
            {url && (
              <img
                src={url}
                alt="Aucune image trouvée"
                className="text-centers h-52 mt-1 mx-auto"
              />
            )}
            {errors.imageUrl && touched.imageUrl && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.imageUrl}
              </div>
            )}
          </div>

          <div className="mb-3 sm:mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                touched.categoryIngredientsId &&
                errors.categoryIngredientsId &&
                "border-red-600"
              } cursor-pointer`}
              name="categoryIngredientsId"
              as="select"
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  name="categoryIngredientsId"
                >
                  {category.name}
                </option>
              ))}
            </Field>
            {errors.categoryIngredientsId && touched.categoryIngredientsId && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.categoryIngredientsId}
              </div>
            )}
          </div>

          {ingredient ? (
            <button
              type="submit"
              className="md:text-lg flex items-center justify-center mt-5 md:mt-10 p-3 md:p-5 bg-blue-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-blue-600/75"
            >
              <FaEdit className="text-xl md:text-3xl mr-2" /> Modifier
              l'ingrédient
            </button>
          ) : (
            <button
              type="submit"
              className="md:text-lg flex items-center justify-center mt-5 md:mt-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75"
            >
              <RiAddCircleFill className="text-xl md:text-3xl mr-2" /> Ajouter
              l'ingrédient
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default AdminIngredientForm
