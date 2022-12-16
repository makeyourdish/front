import Link from "next/link"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import api from "../../src/components/services/api"
import Layout from "../../src/components/Layout"
import AdministrationIngredientsList from "../../src/components/admin/AdministrationIngredientsList"

const IngredientsAdministrationPage = () => {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: "Tomate",
      imageUrl:
        "https://www.alimentarium.org/sites/default/files/media/image/2016-10/AL001-02%20tomate_0.jpg",
      category: "Fruit",
    },
    {
      id: 2,
      name: "Carotte",
      imageUrl:
        "https://www.alimentarium.org/sites/default/files/media/image/2016-10/AL012-02%20carotte_0.jpg",
      category: "Légume",
    },
    {
      id: 3,
      name: "Filet de poulet",
      imageUrl:
        "https://www.maison-conquet.fr/1388-pdt_540/filet-de-poulet-francais-par-2.jpg",
      category: "Viande",
    },
    {
      id: 4,
      name: "Côte de porc",
      imageUrl:
        "https://dynfiles.comme-a-la-boucherie.com/original-catalogue-produit-11-12-2013---11-20-19---714.jpg",
      category: "Viande",
    },
    {
      id: 5,
      name: "Pomme de terre",
      imageUrl:
        "https://www.academiedugout.fr/images/16365/1200-auto/fotolia_55292183_subscription_xl-copy.jpg?poix=50&poiy=50",
      category: "Féculent",
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get("/ingredients") // todo: edit this when database exist
      .then((response) => setIngredients(response.data))
      .catch((err) => {
        setError(err.response ? err.response.data : err.message)
      })
      .then(() => setLoading(false))
  }, [])

  return (
    <Layout
      page="Administration / Liste des ingredients"
      hideheader={+true}
      diplayadminheader={+true}
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl underline font-bold my-5 md:my-10">
        Liste des ingredients
      </h2>
      <AdministrationIngredientsList
        ingredients={ingredients}
        loading={loading}
        error={error}
        setIngredients={setIngredients}
      />
      <Link href={"/administration/ingredients/add"} passHref>
        <button className="mb-12 mx-auto md:text-lg flex items-center justify-center my-5 md:my-10 p-3 md:p-5 bg-green-600 text-white rounded-lg transition-all duration-75 hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-4 focus:outline-green-600/75">
          <RiAddCircleFill className="text-3xl mr-2" /> Ajouter un ingredient
        </button>
      </Link>
    </Layout>
  )
}

// IngredientsAdministrationPage.private = true // todo: edit this when signin exist
// IngredientsAdministrationPage.administration = true // todo: edit this when signin exist

export default IngredientsAdministrationPage
