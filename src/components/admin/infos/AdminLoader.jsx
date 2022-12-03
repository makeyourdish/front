import { Oval } from "react-loader-spinner"

const AdminLoader = ({ size, color, strokeWidth }) => {
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
      <p className="font-bold text-xl ml-3">
        Chargement de la liste des ingrédients... ⌛
      </p>
    </div>
  )
}

export default AdminLoader
