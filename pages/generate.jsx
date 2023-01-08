import Generate from "../src/components/generate/generate"
import { useRouter } from "next/router"

const GeneratePage = () => {
  const router = useRouter()
  const { drink, food } = router.query

  return drink === "" ? (
    <Generate pageTheme="drink" />
  ) : (
    food === "" && <Generate pageTheme="food" />
  )
}

export default GeneratePage
