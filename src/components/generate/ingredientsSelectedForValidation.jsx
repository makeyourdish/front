import AutoCompleteComponent from "./autocomplete"
import { RxCrossCircled } from "react-icons/rx"
import { useRouter } from "next/router"

const IngredientsSelectedForValidation = ({
  categoriesIngredients,
  ingredientsSelected,
  setIngredientsSelected,
  pageTheme,
}) => {
  const router = useRouter()

  const submitIngredientsSelected = () => {
    localStorage.setItem("ingredients", ingredientsSelected)
    router.push(`/recipes?${pageTheme}`)
  }

  return (
    <div
      className={`sm:flex sm:flex-col sm:justify-between sm:fixed sm:top-[20vh] sm:right-[2vw] sm:h-[70vh] sm:p-12 sm:w-[calc(300px+10vw)] sm:rounded-lg sm:bg-black/[.03] max-sm:w-[80%] max-sm:mx-auto max-sm:max-h-[300px] max-sm:mb-[120px]`}
    >
      <span className="mb-6">
        <p className="text-center mb-6 font-bold secondary-font whitespace-nowrap">
          Avez vous d'autres ingrédients ?
        </p>
        <AutoCompleteComponent
          categoriesIngredients={categoriesIngredients}
          pageTheme={pageTheme}
          ingredientsSelected={ingredientsSelected}
          setIngredientsSelected={setIngredientsSelected}
        />
      </span>
      <div className="sm:w-full sm:h-[calc(100%-200px)] max-sm:max-h-[200px] max-sm:flex max-sm:flex-row max-sm:flex-wrap max-sm:justify-center max-sm:mt-8 overflow-y-auto scroller-thumb scroller">
        {ingredientsSelected.map((element, index) => (
          <button
            key={index}
            className="flex flex-row items-center max-sm:h-6 max-sm:mr-4 sm:pr-6 max-sm:p-2 max-sm:m-2 max-sm:rounded-lg max-sm:bg-black/[.04] sm:w-full sm:justify-between"
            onClick={() =>
              setIngredientsSelected(
                ingredientsSelected.filter((element, id) => id !== index)
              )
            }
          >
            <p className="secondary-font sm:mb-2 max-sm:mr-2">{element}</p>
            <RxCrossCircled className="text-red-500" />
          </button>
        ))}
      </div>
      <button
        className={`max-sm:hidden secondary-font p-2 mt-8 bg-${pageTheme}-primary rounded-lg shadow-lg w-full`}
        onClick={() => {
          submitIngredientsSelected()
        }}
      >
        Valider
      </button>
      {/* boutton pour le design mobile*/}
      <button
        className={`sm:hidden w-full py-[15px] secondary-font rounded-t-full bg-${pageTheme}-primary fixed bottom-0 border-t-4 border-black/[.1]`}
        onClick={() => {
          submitIngredientsSelected()
        }}
      >
        Valider
      </button>
    </div>
  )
}

export default IngredientsSelectedForValidation
