import { FiAlertTriangle } from "react-icons/fi"

const AdminResponseError = ({ error, otherClass }) => {
  return (
    <div
      className={`flex items-center justify-center p-2 md:p-5 bg-red-200 rounded-lg md:mx-12 ${otherClass}`}
    >
      <p className="md:text-3xl font-bold flex items-center justify-center text-red-600">
        <FiAlertTriangle className="text-3xl md:text-5xl mr-3" />
        {error}
      </p>
    </div>
  )
}
export default AdminResponseError
