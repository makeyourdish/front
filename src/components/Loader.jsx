import { MutatingDots } from "react-loader-spinner"

const Loader = ({ size, primaryColor, secondaryColor, message }) => {
  const loaderSize = size ? size : 100
  const loaderColor = primaryColor ? primaryColor : "#F68A8A"
  const loaderSecondaryColor = secondaryColor ? secondaryColor : "#FFFCB5"

  //* https://mhnpd.github.io/react-loader-spinner/docs/category/components
  return (
    <div className="flex items-center justify-center">
      <MutatingDots
        height={loaderSize}
        width={loaderSize}
        color={loaderColor}
        secondaryColor={loaderSecondaryColor}
      />
      <p className="hidden md:block font-bold text-2xl ml-3">{message}</p>
    </div>
  )
}

export default Loader
