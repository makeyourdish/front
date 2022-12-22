import ListItems from "../src/components/ListItems"

const List = () => {
  let queryString

  if (typeof window !== "undefined") {
    queryString = window.location.search
  }
  
  return queryString === "?drink" ? (
    <ListItems pageTheme="drink" />
  ) : (
    <ListItems pageTheme="food" />
  )
}

export default List
