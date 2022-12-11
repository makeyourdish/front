import Link from "next/link"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdministrationReceipesList from "../../src/components/admin/AdministrationReceipesList"

const ReceipesAdministrationPage = () => {
  const [receipes, setReceipes] = useState([
    {
      id: 1,
      name: "Oeufs mollets de ma grand-mère",
      imageUrl:
        "https://assets.afcdn.com/recipe/20190219/88020_w640h486c1cx1816cy2983cxb3738cyb5083.webp",
      preparationTime: "8",
      recipeTypeId: "Plat",
    },
    {
      id: 2,
      name: "Tarte thon, tomate et moutarde",
      imageUrl:
        "https://assets.afcdn.com/recipe/20180503/79010_w1000h1500c1cx1920cy2880.webp",
      preparationTime: "55",
      recipeTypeId: "Plat",
    },
    {
      id: 3,
      name: "Soupe au choux",
      imageUrl:
        "https://assets.afcdn.com/recipe/20200517/111343_w1000h667c1cx2880cy1920cxb5760cyb3840.webp",
      preparationTime: "2h20",
      recipeTypeId: "Entrée",
    },
    {
      id: 4,
      name: "Mojito",
      imageUrl:
        "https://assets.afcdn.com/recipe/20180705/80255_w350h250c1cx2774cy1849.jpg",
      preparationTime: "2",
      recipeTypeId: "Cocktail alcoolisé",
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/receipes") // todo: edit this when database exist
      .then((response) => setReceipes(response.data))
      .catch((err) => {
        setError(err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout
      page="Administration / Liste des recettes et cocktails"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Liste des recettes et cocktails
      </h2>
      <AdministrationReceipesList
        receipes={receipes}
        loading={loading}
        error={error}
        setIngredients={setReceipes}
      />
      <Link href={"/administration/receipes/add"} passHref>
        <button className="mx-auto md:text-lg flex items-center justify-center my-5 md:my-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75">
          <RiAddCircleFill className="text-3xl mr-2" /> Ajouter une recette ou
          cocktail
        </button>
      </Link>
    </Layout>
  )
}

// ReceipesAdministrationPage.private = true // todo: edit this when signin exist
// ReceipesAdministrationPage.administration = true // todo: edit this when signin exist

export default ReceipesAdministrationPage
