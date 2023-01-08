/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import Swal from "sweetalert2"
import { RiDeleteBin4Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import api from "../services/api"
import AdminLoader from "./infos/AdminLoader"
import AdminResponseError from "./infos/AdminResponseError"
import AdminResponseNotFound from "./infos/AdminResponseNotFound"

//* -------------------- Delete recipe confirm dialog box --------------------
const showDeleteRecipeConfirm = (id, name, recipes, setRecipes) => {
  Swal.fire({
    title: `Vous êtes sûr de vouloir supprimer la recette ou le cocktail "${name}" ?`,
    text: "Cette action est définitive !",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Oui",
    denyButtonText: "Non",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `La recette ou le cocktail "${name}" à été supprimée`,
        icon: "success",
      })
      deleteRecipe(id, recipes, setRecipes)
    }
  })
}

//* -------------------- Delete recipe function --------------------
const deleteRecipe = async (id, recipes, setRecipes) => {
  await api.delete(`/recipe/${id}`)
  setTimeout(() => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
  }, 1000)
}
//* -------------------- End delete recipe --------------------

const AdministrationrecipeList = ({ recipes, loading, error, setRecipes }) => {
  if (loading) {
    return <AdminLoader message="Chargement de la liste des recettes" />
  }

  if (error) {
    return <AdminResponseError error={error} otherClass="mt-10" />
  }

  if (!recipes.length) {
    return <AdminResponseNotFound message="Aucune recette trouvée" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-max 2xl:w-4/5 mx-auto text-center text-lg whitespace-nowrap">
        <thead className="bg-gray-600 font-bold text-white">
          <tr>
            <th className="border px-3">Nom de l'ingrédient</th>
            <th className="border px-3">Image</th>
            <th className="border px-3">Tps. de préparation</th>
            <th className="border px-3">Type</th>
            <th className="border px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={recipe.id} className={index % 2 && "bg-slate-200"}>
              <td className="border px-8">{recipe.name}</td>
              <td className="border w-max">
                <img
                  src={recipe.imageUrl}
                  alt="image de la recette ou du cocktail"
                  className="object-cover h-40 mx-auto"
                />
              </td>
              <td className="border px-8">{recipe.preparationTime}</td>
              <td className="border px-8">{recipe.recipeType.name}</td>
              <td className="border">
                <Link
                  href={`/administration/recipes/${recipe.id}/modify`}
                  passHref
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mr-1 transition-all duration-75 focus:outline focus:outline-4 focus:outline-blue-700/50">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() =>
                    showDeleteRecipeConfirm(
                      recipe.id,
                      recipe.name,
                      recipes,
                      setRecipes
                    )
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-3 rounded transition-all duration-75 focus:outline focus:outline-4 focus:outline-red-700/50"
                >
                  <RiDeleteBin4Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-600 font-bold text-white">
          <tr>
            <td>Nom de l'ingrédient</td>
            <td>Image</td>
            <th>Tps. de préparation</th>
            <td>Type</td>
            <td>Actions</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AdministrationrecipeList
