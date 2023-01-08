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
const showDeleteCategoryIngredientConfirm = (
  id,
  name,
  categoryIngredients,
  setCategoryIngredients
) => {
  Swal.fire({
    title: `Vous êtes sûr de vouloir supprimer la categorie "${name}" ?`,
    text: "Cette action est définitive et cela supprimera également les ingrédients de cette catégorie (si ceux-ci sont dans une recette vous devrez les retirer de celle-ci ou la supprimer.) !",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Oui",
    denyButtonText: "Non",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `La catégorie "${name}" à été supprimée`,
        icon: "success",
      })
      deleteCategoryIngredient(id, categoryIngredients, setCategoryIngredients)
    }
  })
}

//* -------------------- Delete ingredient function --------------------
const deleteCategoryIngredient = async (
  id,
  categoryIngredients,
  setCategoryIngredients
) => {
  await api.delete(`/categoryIngredient/${id}`)
  setTimeout(() => {
    setCategoryIngredients(
      categoryIngredients.filter((category) => category.id !== id)
    )
  }, 1000)
}
//* -------------------- End delete ingredient --------------------

const AdministrationingredientList = ({
  categoryIngredients,
  loading,
  error,
  setCategoryIngredients,
}) => {
  if (loading) {
    return (
      <AdminLoader message="Chargement de la liste des catégories ingrédients" />
    )
  }

  if (error) {
    return <AdminResponseError error={error} otherClass="mt-10" />
  }

  if (!categoryIngredients.length) {
    return (
      <AdminResponseNotFound message="Aucune catégorie d'ingrédient n'a été trouvée" />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-max 2xl:w-4/5 mx-auto text-center text-lg whitespace-nowrap">
        <thead className="bg-gray-600 font-bold text-white">
          <tr>
            <th className="border px-3">Nom de la catégorie</th>
            <th className="border px-3">Type de recette concerné</th>
            <th className="border px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryIngredients.map((category, index) => (
            <tr key={category.id} className={index % 2 && "bg-slate-200"}>
              <td className="border w-1/2 px-8">{category.name}</td>
              <td className="border w-1/2 px-8">
                {category.isCocktail ? "Cocktails et plats" : "Plats"}
              </td>
              <td className="border w-min">
                <Link
                  href={`/administration/categoryIngredients/${category.id}/modify`}
                  passHref
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mr-1 transition-all duration-75 focus:outline focus:outline-4 focus:outline-blue-700/50">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() =>
                    showDeleteCategoryIngredientConfirm(
                      category.id,
                      category.name,
                      categoryIngredients,
                      setCategoryIngredients
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
            <td>Nom de la catégorie</td>
            <th>Type de recette concerné</th>
            <td>Actions</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AdministrationingredientList
