import { FiAlertCircle } from "react-icons/fi"

const AdminResponseNotFound = ({ message }) => {
  return (
    <div className="flex items-center justify-center mt-10 p-2 md:p-5 bg-yellow-200 rounded-lg mx-12">
      <p className="md:text-3xl font-bold flex items-center justify-center text-yellow-600">
        <FiAlertCircle className="text-3xl md:text-5xl mr-3" />
        {message}
      </p>
    </div>
  )
}
export default AdminResponseNotFound
