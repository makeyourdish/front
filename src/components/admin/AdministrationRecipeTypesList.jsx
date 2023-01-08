/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import Swal from "sweetalert2"
import { RiDeleteBin4Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import api from "../services/api"
import AdminLoader from "./infos/AdminLoader"
import AdminResponseError from "./infos/AdminResponseError"
import AdminResponseNotFound from "./infos/AdminResponseNotFound"

//* -------------------- Delete type confirm dialog box --------------------
const showDeleteCategorytypeConfirm = (
  id,
  name,
  recipeTypes,
  setrecipeTypes
) => {
  Swal.fire({
    title: `Vous êtes sûr de vouloir supprimer le type de recette / cocktail "${name}" ?`,
    text: "Cette action est définitive et cela supprimera également les recette de ce type !",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Oui",
    denyButtonText: "Non",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Le type "${name}" à été supprimée`,
        icon: "success",
      })
      deleteRecipeype(id, recipeTypes, setrecipeTypes)
    }
  })
}

//* -------------------- Delete type function --------------------
const deleteRecipeype = async (id, recipeTypes, setrecipeTypes) => {
  await api.delete(`/recipeType/${id}`)
  setTimeout(() => {
    setrecipeTypes(recipeTypes.filter((type) => type.id !== id))
  }, 1000)
}
//* -------------------- End delete type --------------------

const AdministrationtypeList = ({
  recipeTypes,
  loading,
  error,
  setRecipeTypes,
}) => {
  if (loading) {
    return (
      <AdminLoader message="Chargement de la liste des catégories ingrédients" />
    )
  }

  if (error) {
    return <AdminResponseError error={error} otherClass="mt-10" />
  }

  if (!recipeTypes.length) {
    return <AdminResponseNotFound message="Aucun ingrédient trouvé" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-max 2xl:w-4/5 mx-auto text-center text-lg whitespace-nowrap">
        <thead className="bg-gray-600 font-bold text-white">
          <tr>
            <th className="border px-3">Nom du type de recette</th>
            <th className="border px-3">Type de recette concerné</th>
            <th className="border px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipeTypes.map((type, index) => (
            <tr key={type.id} className={index % 2 && "bg-slate-200"}>
              <td className="border w-1/2 px-8">{type.name}</td>
              <td className="border w-1/2 px-8">
                {type.isCocktail ? "Cocktail" : "Plat"}
              </td>
              <td className="border w-min">
                <Link
                  href={`/administration/recipeTypes/${type.id}/modify`}
                  passHref
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mr-1 transition-all duration-75 focus:outline focus:outline-4 focus:outline-blue-700/50">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() =>
                    showDeleteCategorytypeConfirm(
                      type.id,
                      type.name,
                      recipeTypes,
                      setRecipeTypes
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
            <td>Nom du type de recette</td>
            <th>Type de recette concerné</th>
            <td>Actions</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AdministrationtypeList
