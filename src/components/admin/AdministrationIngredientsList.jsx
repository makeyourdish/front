/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import Swal from "sweetalert2"
import { RiDeleteBin4Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import api from "../services/api"
import AdminLoader from "./infos/AdminLoader"
import AdminResponseError from "./infos/AdminResponseError"
import AdminResponseNotFound from "./infos/AdminResponseNotFound"

//* -------------------- Delete ingredient confirm dialog box --------------------
const showDeleteIngredientConfirm = (id, name, ingredients, setIngredients) => {
  Swal.fire({
    title: `Vous êtes sûr de vouloir supprimer l'ingrédient "${name}" ?`,
    text: "Cette action est définitive !",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Oui",
    denyButtonText: "Non",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `L'ingrédient "${name}" à été supprimée`,
        icon: "success",
      })
      deleteIngredient(id, ingredients, setIngredients)
    }
  })
}

//* -------------------- Delete ingredient function --------------------
const deleteIngredient = async (id, ingredients, setIngredients) => {
  await api.delete(`/ingredient/${id}`)
  setTimeout(() => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
  }, 1000)
}
//* -------------------- End delete ingredient --------------------

const AdministrationingredientList = ({
  ingredients,
  loading,
  error,
  setIngredients,
}) => {
  if (loading) {
    return <AdminLoader message="Chargement de la liste des ingrédients" />
  }

  if (error) {
    return <AdminResponseError error={error} otherClass="mt-10" />
  }

  if (!ingredients.length) {
    return <AdminResponseNotFound message="Aucun ingrédient trouvé" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-max 2xl:w-4/5 mx-auto text-center text-lg whitespace-nowrap">
        <thead className="bg-gray-600 font-bold text-white">
          <tr>
            <th className="border px-3">Nom de l'ingrédient</th>
            <th className="border px-3">Image</th>
            <th className="border px-3">Type</th>
            <th className="border px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={ingredient.id} className={index % 2 && "bg-slate-200"}>
              <td className="border w-min px-8">{ingredient.name}</td>
              <td className="border w-min">
                <img
                  src={ingredient.imageUrl}
                  alt="image de l'ingrédient"
                  className="object-cover h-40 mx-auto"
                />
              </td>
              <td className="border w-min px-8">
                {ingredient.categoryIngredients.name}
              </td>
              <td className="border w-min">
                <Link
                  href={`/administration/ingredients/${ingredient.id}/modify`}
                  passHref
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mr-1 transition-all duration-75 focus:outline focus:outline-4 focus:outline-blue-700/50">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() =>
                    showDeleteIngredientConfirm(
                      ingredient.id,
                      ingredient.name,
                      ingredients,
                      setIngredients
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
            <td>Type</td>
            <td>Actions</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AdministrationingredientList
