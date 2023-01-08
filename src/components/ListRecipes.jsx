import { useEffect, useState } from "react"
import Layout from "./Layout"
import api from "./services/api"
import { useRouter } from "next/router"

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const router = useRouter()
  const path = window.location.search.slice(1)

  useEffect(() => {
    if (path.includes("food")) {
      getRecipesWithApi("NormalRecipe")
    } else if (path.includes("drink")) {
      getRecipesWithApi("CocktailRecipe")
    }
  }, [])

  const getRecipesWithApi = (endpoint) => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`)
      .then((response) => {
        setRecipes(response.data)
      })
  }

  const DisplayRecipes = () => {
    
      let cpt = 0
    return recipes.map((recipe, key) => {
      const recipeIngredients = []
      recipe.ingredients.forEach((ingredient) => {
        recipeIngredients.push(ingredient.ingredient.name)
      })

      const isContainsIngredientsSelected = recipeIngredients.includes(
        localStorage.getItem("ingredients")
      )


      return (
        (isContainsIngredientsSelected ||
          localStorage.getItem("ingredients") === "") && (
          <li
            key={key}
            className={`rounded-xl m-auto w-[80%] max-w-[1200px] mb-6 tertiary-font bg-black/[.03] hover:outline hover:outline-[7px] outline-${path}-primary duration-150 transition-all rounded-lg`}
          >
            <button
              onClick={() => {
                router.push(
                  path.includes("food")
                    ? `/recipes/${recipe.id}`
                    : `/drinks/${recipe.id}`
                )
              }}
              className="p-8"
            >
              <h4
                className={`mb-6 max-sm:text-center text-left sm:pl-8 text-3xl font-bold text-${path}-primary`}
              >
                {recipe.name}
              </h4>
              <div className="flex max-sm:flex-col sm:flex-row justify-between">
                <img
                  src={recipe.imageUrl}
                  className="rounded-xl max-w-[200px] max-sm:m-auto max-sm:mb-5"
                />
                <div className="flex flex-col max-sm:text-center justify-between mx-[5vw]">
                  <p className="max-sm:mb-8 text-lg sm:mb-6 pr-8 overflow-y-auto max-h-[180px] scroller scroller-thumb">
                    {recipe.description}
                  </p>
                  <section>
                    <span className="flex flex-row justify-around max-sm:mb-2 ">
                      <p>{recipe.preparationTime}</p>
                      <p>{recipe.personNb} personne(s)</p>
                    </span>
                    <span className="flex flex-row justify-around">
                      <p> Difficulté : {recipe.difficulty}</p>
                      <p>Coût : {recipe.priceRange}</p>
                    </span>
                  </section>
                </div>
              </div>
            </button>
          </li>
          {cpt++}
        )
      )
    })
  }

  return (
    <Layout page="Recipes" pagetheme={path} screensize={+true}>
      <div className="my-20">
        <h1 className="text-4xl secondary-font mb-16 max-sm:text-center sm:pl-[25%]">
          Nos recettes
        </h1>
        <ul>
          <DisplayRecipes />
        </ul>
      </div>
    </Layout>
  )
}

export default ListRecipes
