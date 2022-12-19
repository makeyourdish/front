import { Oval } from "react-loader-spinner"

const AdminLoader = ({ size, color, strokeWidth, message }) => {
  const loaderSize = size ? size : 60
  const loaderColor = color ? color : "slateblue"
  const loaderStrokeWidth = strokeWidth ? strokeWidth : 5

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
      <p className="font-bold text-xl ml-3">{message}... ⌛</p>
    </div>
  )
}

export default AdminLoader
