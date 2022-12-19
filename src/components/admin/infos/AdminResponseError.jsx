import { FiAlertTriangle } from "react-icons/fi"

const AdminResponseError = ({ error }) => {
  return (
    <div className="flex items-center justify-center mt-10 p-5 bg-red-200 rounded-lg mx-12">
      <p className="text-3xl font-bold flex items-center justify-center text-red-600">
        <FiAlertTriangle className="text-5xl mr-3" />
        {error}
      </p>
    </div>
  )
}
export default AdminResponseError
