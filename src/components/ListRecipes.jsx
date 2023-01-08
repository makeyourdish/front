import { useEffect, useState } from "react"
import Layout from "./Layout"
import api from "./services/api"

const ListRecipes = (pageTheme) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const path = window.location.search
    if (path.includes("food")) {
      getRecipesWithApi("NormalRecipe")
    } else if (path.includes("drink")) {
      getRecipesWithApi("CocktailRecipe")
    }
    console.log(recipes)
  }, [])

  const getRecipesWithApi = (endpoint) => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`)
      .then((response) => {
        setRecipes(response.data)
      })
  }

  const displayRecipes = () => {
    return (
      <div className="border-b-[1px] border-black/20 p-8 m-auto  w-[80%] tertiary-font">
        <h4 className="mb-8 max-sm:text-center sm:pl-8 text-3xl font-bold">
          Titre d'une recette
        </h4>
        <span className="flex max-sm:flex-col sm:flex-row justify-between">
          <div className="flex flex-col max-sm:text-center justify-around text-xl">
            <p className="max-sm:mb-12">
              Une pintade farcie au foie gras et aux marrons avec ses légumes
              oubliés, une recette aux couleurs chaleureuses à déguster avec vos
              proches !
            </p>
            <div className="flex flex-row justify-around max-sm:mb-6">
              <p>1h55</p>
              <p>4 personnes</p>
            </div>
            <div className="flex flex-row justify-around">
              <span id="stars">3</span>
              <span id="priceSlice">4</span>
            </div>
          </div>
        </span>
      </div>
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
