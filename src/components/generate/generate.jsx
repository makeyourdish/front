import { useEffect, useState } from "react"
import Layout from "../Layout"
import api from "../services/api"
import IngredientsList from "./ingredientsList"
import IngredientsSelectedForValidation from "./ingredientsSelectedForValidation"

const Generate = ({ pageTheme }) => {
  const [ingredientsSelected, setIngredientsSelected] = useState([])
  const [categoriesIngredients, setCategoriesIngredients] = useState([])

  useEffect(() => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}allCategoryIngredient`)
      .then((response) => {
        if (pageTheme === "drink") {
          const categoriesIngredientsCocktail = []
          response.data.forEach((categoryIngredient) => {
            if (categoryIngredient.isCocktail) {
              categoriesIngredientsCocktail.push(categoryIngredient)
            }
          })
          setCategoriesIngredients(categoriesIngredientsCocktail)
        } else {
          setCategoriesIngredients(response.data)
        }
      })
  }, [])

  return (
    <Layout page="Recipes" pagetheme={pageTheme} screensize={+true}>
      <h1 className="text-2xl mt-[8vh] secondary-font sm:ml-[5vw] max-sm:text-center">
        Qu’y a-t-il dans votre cuisine ?
      </h1>
      <IngredientsList
        categoriesIngredients={categoriesIngredients}
        ingredientsSelected={ingredientsSelected}
        setIngredientsSelected={setIngredientsSelected}
        pageTheme={pageTheme}
      />
      <IngredientsSelectedForValidation
        categoriesIngredients={categoriesIngredients}
        ingredientsSelected={ingredientsSelected}
        setIngredientsSelected={setIngredientsSelected}
        pageTheme={pageTheme}
      />
    </Layout>
  )
}

export default Generate
