import { useEffect, useState } from "react"
import Layout from "./Layout"
import api from "./services/api"

const ListRecipes = (pageTheme) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const path = window.location.search
    if (path.includes("?food")) {
      getRecipesWithApi("NormalRecipe")
    } else if (path.includes("?drink")) {
      getRecipesWithApi("CocktailRecipe")
    }
  }, [])

  const getRecipesWithApi = (endpoint) => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`)
      .then((response) => {
        console.log(response.data)
        setRecipes(response.data)
      })
  }

  const displayRecipes = () => {
    return (
      <ul>
        {recipes.map((recipe, key) => {
          return (
            <li
              key={key}
              className="border-b-[1px] border-black/20 py-8 m-auto w-[80%] max-w-[1200px] tertiary-font bg-red-200"
            >
              <h4 className="mb-4 max-sm:text-center sm:pl-8 text-3xl font-bold">
                {recipe.name}
              </h4>
              <div className="flex max-sm:flex-col sm:flex-row justify-between bg-purple-200">
                <img
                  src={recipe.imageUrl}
                  className="rounded-xl max-w-[200px] max-sm:m-auto max-sm:mb-5"
                />
                <div className="flex flex-col max-sm:text-center justify-between mx-[5vw] bg-green-300">
                  <p className="max-sm:mb-8 text-lg sm:mb-6 overflow-y-auto max-h-[180px] scroller scroller-thumb bg-yellow-400">
                    {recipe.description}
                  </p>
                  <section className="bg-slate-100">
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
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <Layout page="Recipes" pagetheme={pageTheme.pageTheme} screensize={+true}>
      <div className="my-20">
        <h1 className="text-4xl secondary-font mb-16 max-sm:text-center sm:pl-[25%]">
          Nos recettes
        </h1>
        {displayRecipes()}
      </div>
    </Layout>
  )
}

export default ListRecipes
