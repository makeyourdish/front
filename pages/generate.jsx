import Generate from "../src/components/generateComponent"
import { useRouter } from "next/Router"

const GeneratePage = () => {
  const router = useRouter()
  const { drink, food } = router.query

  return drink === "" ? (
    <Generate pageTheme="drink" />
  ) : food === "" ? (
    <Generate pageTheme="food" />
  ) : null
}

export default GeneratePage
