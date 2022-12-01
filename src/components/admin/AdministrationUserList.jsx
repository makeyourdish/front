import Link from "next/link"
import Swal from "sweetalert2"
import { Oval } from "react-loader-spinner"
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi"
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri"
// import api from "../services/api" // todo: edit this when exist

const showDeleteUserConfirm = (id, userName, users, setUsers) => {
  Swal.fire({
    title: `Vous êtes sûr de vouloir supprimer l'utilisateur "${userName}" ?`,
    text: "Cette action est définitive !",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Oui",
    denyButtonText: "Non",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `L'utilisateur "${userName}" à été supprimée`,
        icon: "success",
      })
      deleteUser(id, users, setUsers)
    }
  })
}

const deleteUser = async (id, users, setUsers) => {
  // await api.delete(`/users/${id}`) // todo: edit this when exist
  setTimeout(() => {
    setUsers(users.filter((user) => user.id !== id))
  }, 1000)
}

const AdministrationUserList = ({ users, loading, error, setUsers }) => {
  if (loading) {
    const loaderSize = 60
    const loaderColor = "slateblue"
    const loaderStrokeWidth = 5

    return (
      <div className="flex items-center justify-center">
        <Oval
          height={loaderSize}
          width={loaderSize}
          color={loaderColor}
          secondaryColor={loaderColor}
          strokeWidth={loaderStrokeWidth}
          strokeWidthSecondary={loaderStrokeWidth}
        />
        <p className="font-bold text-xl ml-3">
          Chargement de la liste des utilisateurs... ⌛
        </p>
      </div>
    )
  }

  // for test
  error = false
  // end test

  if (error) {
    return (
      <div className="flex items-center justify-center mt-10 p-5 bg-red-200 rounded-lg mx-12">
        <p className="text-3xl font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-5xl mr-3" />
          {error}
        </p>
      </div>
    )
  }

  if (!users.length) {
    return (
      <div className="flex items-center justify-center mt-10 p-5 bg-yellow-200 rounded-lg mx-12">
        <p className="text-3xl font-bold flex items-center justify-center text-yellow-600">
          <FiAlertCircle className="text-5xl mr-3" />
          Aucun utilisateur trouvé
        </p>
      </div>
    )
  }

  return (
    <div>
      <table className="w-1/2 mx-auto text-center text-lg">
        <thead className="bg-gray-600 font-bold text-white">
          <tr>
            <th className="border">Nom d'utilisateur</th>
            <th className="border">Email</th>
            <th className="border">Admin</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 && "bg-slate-200"}>
              <td className="border">{user.userName}</td>
              <td className="border">{user.email}</td>
              <td className="border">{user.isAdmin ? "Oui" : "Non"}</td>
              <td className="border">
                <Link href={`/administration/users/${user.id}/modify`} passHref>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded">
                    <RiEdit2Fill />
                  </button>
                </Link>
                <button
                  onClick={() =>
                    showDeleteUserConfirm(
                      user.id,
                      user.userName,
                      users,
                      setUsers
                    )
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-3 rounded"
                >
                  <RiDeleteBin4Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-600 font-bold text-white">
          <tr>
            <td>Nom d'utilisateur</td>
            <td>Email</td>
            <td>Admin</td>
            <td>Actions</td>
          </tr>
        </tfoot>
      </table>

      <button className="mx-auto text-lg flex items-center justify-center mt-10 p-5 bg-green-600 text-white rounded-lg transition-all hover:scale-105 hover:drop-shadow-xl focus:outline focus:outline-3 focus:outline-green-600/75">
        Ajouter un utilisateur
      </button>
    </div>
  )
}

export default AdministrationUserList
