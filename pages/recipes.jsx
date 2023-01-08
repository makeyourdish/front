import ListItems from "../src/components/ListRecipes"
import { useRouter } from "next/router"

const Recipes = () => {
  const router = useRouter()
  const { drink, food } = router.query

  return drink === "" ? (
    <ListItems pageTheme="drink" />
  ) : (
    food === "" && <ListItems pageTheme="food" />
  )
}

export default Recipes
