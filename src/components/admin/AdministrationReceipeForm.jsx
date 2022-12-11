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
  personNb: Yup.number()
    .min(1, "Le nombre de personne doit être supérieur à 0")
    .max(10, "Le nombre de personne doit être inférieur ou égal à 10")
    .required("Le nombre de personne est requis"),
  description: Yup.string()
    .required("La description est requise")
    .max(500, "La description doit faire moins de 500 caractères"),
  imageUrl: Yup.string().required("Vous devez ajouter une image"),
  preparationTimeHours: Yup.string().required(
    "Le temps de préparation est requis"
  ),
  preparationTimeMinutes: Yup.string().required(
    "Le temps de préparation est requis"
  ),
  priceRange: Yup.string().required("La tranche prix est requise"),
  difficulty: Yup.string().required("La difficulté est requise"),
  typeReceipeId: Yup.string().required("Le champ est requis !"),
  step: Yup.string().required("Les étapes de préparation sont requises"),
  ingredients: Yup.string().required("Les ingrédients sont requis"),
})
//* -------------------------- End validation schema --------------------------

const AdminReceipeForm = ({ receipe, loading, error }) => {
  const router = useRouter()

  //* -------------------------- Receipe types data --------------------------
  const [types, setTypes] = useState([
    { id: 1, name: "Entrée" },
    { id: 2, name: "Plat" },
    { id: 3, name: "Dessert" },
    { id: 4, name: "Cockctail non alcoolisé" },
    { id: 5, name: "Cockctail alcoolisé" },
  ])
  const [typesLoading, setTypesLoading] = useState(false)
  // const [typesLoading, setTypesLoading] = useState(true)
  const [typesError, setTypesError] = useState(null)

  useEffect(() => {
    api
      .get("/allRecipeType")
      .then((response) => setTypes(response.data))
      .catch((err) => {
        setTypesError(err.message)
      })

      .then(() => setTypesLoading(false))
  }, [])
  //* -------------------------- End Receipe types data --------------------------

  //* -------------------------- ingredients data --------------------------
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Oeuf" },
    { id: 2, name: "Salade" },
    { id: 3, name: "Bacon" },
    { id: 4, name: "Tomates" },
    { id: 5, name: "Poires" },
  ])
  const [ingredientsLoading, setIngredientsLoading] = useState(false)
  // const [ingredientsLoading, setIngredientsLoading] = useState(true)
  const [ingredientsError, setIngredientsError] = useState(null)

  useEffect(() => {
    api
      .get("/allIngredient")
      .then((response) => setIngredients(response.data))
      .catch((err) => {
        setIngredientsError(err.message)
      })

      .then(() => setIngredientsLoading(false))
  }, [])
  //* -------------------------- End ingredients data --------------------------

  const [url, setUrl] = useState(receipe ? receipe.imageUrl : "")
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ]
  const minutes = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ]
  const priceRanges = [
    { id: 1, priceRangeName: "Économique" },
    { id: 2, priceRangeName: "Bon marché" },
    { id: 3, priceRangeName: "Moyen" },
    { id: 4, priceRangeName: "Coûteux" },
    { id: 5, priceRangeName: "Très coûteux" },
  ]
  const difficulties = [
    { id: 1, difficultyName: "Très facile" },
    { id: 2, difficultyName: "Facile" },
    { id: 3, difficultyName: "Moyen" },
    { id: 4, difficultyName: "Difficile" },
    { id: 5, difficultyName: "Très difficile" },
  ]

  const handleSubmit = useCallback(
    async ({ name, imageUrl, recipeTypeId }) => {
      receipe
        ? await api.put(`/receipes/${receipe.id}`, {
            name,
            imageUrl,
            recipeTypeId,
          })
        : await api.post("/Receipes", {
            name,
            imageUrl,
            recipeTypeId,
          })
      router.push("/administration/Receipes")
    },
    [router, receipe]
  )

  if (loading || typesLoading || ingredientsLoading) {
    return <AdminLoader message="Chargement du formulaire" />
  }

  //! for testing only
  error = false
  //! end for testing only

  if (error || typesError || ingredientsError) {
    return <AdminResponseError error={error || typesError} />
  }

  if (!types.length) {
    return (
      <AdminResponseError error="Vous devez créer au moins un type de recette ou de cocktail" />
    )
  }

  if (!ingredients.length) {
    return (
      <AdminResponseError error="Vous devez créer au moins un ingrédient" />
    )
  }

  if (receipe && !Object.keys(receipe).length) {
    return <AdminResponseNotFound message="Recette ou cocktail non trouvé" />
  }

  return (
    <Formik
      initialValues={{
        name: receipe ? receipe.name : "",
        imageUrl: receipe ? receipe.imageUrl : "",
        recipeTypeId: receipe ? receipe.recipeTypeId : types[0].id,
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-5/6 md:w-4/5 lg:w-1/2 p-4 sm:p-8 md:p-12 border mx-auto flex flex-col items-center justify-center rounded">
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

          <div className="flex items-start justify-center w-full">
            <div className="mb-3 mr-3 sm:mb-6 w-full">
              <Field
                className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                  touched.recipeTypeId &&
                  errors.recipeTypeId &&
                  "border-red-600"
                } cursor-pointer`}
                name="recipeTypeId"
                as="select"
              >
                {types.map((type) => (
                  <option key={type.id} value={type.id} name="TypesId">
                    {type.name}
                  </option>
                ))}
              </Field>
              {errors.recipeTypeId && touched.recipeTypeId && (
                <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                  {errors.recipeTypeId}
                </div>
              )}
            </div>

            <div className="mb-3 sm:mb-6 w-full">
              <div className="flex items-center justify-center">
                <Field
                  className={`flex-1 text-right border-2 rounded-l py-1 px-2 transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                    touched.personNb && errors.personNb && "border-red-600"
                  }`}
                  type="number"
                  label="Le nombre de personnes"
                  name="personNb"
                  placeholder="Pour combien de prs."
                />
                <span className="border-2 bg-gray-200 rounded-r py-1 px-2">
                  personne(s)
                </span>
              </div>
              {errors.personNb && touched.personNb && (
                <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                  {errors.personNb}
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-start justify-center">
            <div className=" mr-3 flex items-center justify-center mb-3 sm:mb-6 w-full">
              <Field
                className={`border-2 rounded-l py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                  touched.preparationTimeHours &&
                  errors.preparationTimeHours &&
                  "border-red-600"
                } cursor-pointer`}
                name="preparationTimeHours"
                as="select"
              >
                {hours.map((hour, index) => (
                  <option key={index} value={hour} name="preparationTimeHours">
                    {hour}
                  </option>
                ))}
              </Field>
              <span className="bg-gray-200 py-[5.6px] px-2">H</span>
              <Field
                className={`border-2 rounded-r py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                  touched.preparationTimeMinutes &&
                  errors.preparationTimeMinutes &&
                  "border-red-600"
                } cursor-pointer`}
                name="preparationTimeMinutes"
                as="select"
              >
                {minutes.map((minute, index) => (
                  <option
                    key={index}
                    value={minute}
                    name="preparationTimeMinutes"
                  >
                    {minute}
                  </option>
                ))}
              </Field>
              {errors.preparationTimeMinutes &&
                touched.preparationTimeMinutes && (
                  <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                    {errors.preparationTimeMinutes}
                  </div>
                )}
              {errors.preparationTimeHours && touched.preparationTimeHours && (
                <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                  {errors.preparationTimeHours}
                </div>
              )}
            </div>

            <div className="mb-3 mr-3 sm:mb-6 w-full">
              <Field
                className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                  touched.priceRange && errors.priceRange && "border-red-600"
                } cursor-pointer`}
                name="priceRange"
                as="select"
              >
                {priceRanges.map((priceRange) => (
                  <option
                    key={priceRange.id}
                    value={priceRange.id}
                    name="TypesId"
                  >
                    {priceRange.priceRangeName}
                  </option>
                ))}
              </Field>
              {errors.priceRange && touched.priceRange && (
                <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                  {errors.priceRange}
                </div>
              )}
            </div>

            <div className="mb-3 mr-3 sm:mb-6 w-full">
              <Field
                className={`border-2 rounded py-1 px-2 w-full transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                  touched.difficulty && errors.difficulty && "border-red-600"
                } cursor-pointer`}
                name="difficulty"
                as="select"
              >
                {difficulties.map((difficulty) => (
                  <option
                    key={difficulty.id}
                    value={difficulty.id}
                    name="difficulty"
                  >
                    {difficulty.difficultyName}
                  </option>
                ))}
              </Field>
              {errors.difficulty && touched.difficulty && (
                <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                  {errors.difficulty}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3 sm:mb-6 w-full">
            <Field
              className={`border-2 rounded py-1 px-2 w-full -mb-[6px] transition-all duration-75 outline-none outline-offset-0 focus:outline-4 focus:outline-slate-600/75 ${
                touched.description && errors.description && "border-red-600"
              }`}
              as="textarea"
              rows="8"
              label="La description de la recette ou du cocktail"
              name="description"
              placeholder="Le nom de l'ingrédient"
            />
            {errors.description && touched.description && (
              <div className="error-field rounded font-bold p-2 text-red-600 text-center bg-red-200">
                {errors.description}
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

          {/* todo : step, ingredients */}

          {receipe ? (
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

export default AdminReceipeForm
