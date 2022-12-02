import Link from "next/link"
import Swal from "sweetalert2"
import { Oval } from "react-loader-spinner"
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi"
import { RiDeleteBin4Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import api from "../services/api"

//* -------------------- Delete user confirm dialog box --------------------
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

//* -------------------- Delete user function --------------------
const deleteUser = async (id, users, setUsers) => {
  await api.delete(`/users/${id}`) // todo: edit this when database exist
  setTimeout(() => {
    setUsers(users.filter((user) => user.id !== id))
  }, 1000)
}
//* -------------------- End delete user --------------------

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
    <div className="overflow-x-auto">
      <table className="w-max sm:w-5/6 md:w-3/4 lg:w-2/3 mx-auto text-center text-lg whitespace-nowrap">
        <thead className="bg-gray-600 font-bold text-white">
          <tr>
            <th className="border px-3">Nom d'utilisateur</th>
            <th className="border px-3">Email</th>
            <th className="border px-3">Admin</th>
            <th className="border px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 && "bg-slate-200"}>
              <td className="border w-2/5 px-8">{user.userName}</td>
              <td className="border w-3/5 px-8">{user.email}</td>
              <td className="border w-min px-8">
                {user.isAdmin ? "Oui" : "Non"}
              </td>
              <td className="border w-min flex">
                <Link href={`/administration/users/${user.id}/modify`} passHref>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mr-1 transition-all focus:outline focus:outline-3 focus:outline-blue-700/50">
                    <FaEdit />
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
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-3 rounded transition-all focus:outline focus:outline-3 focus:outline-red-700/50"
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
    </div>
  )
}

export default AdministrationUserList
