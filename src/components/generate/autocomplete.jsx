import AutoComplete from "@tarekraafat/autocomplete.js"
import { useEffect } from "react"

const AutoCompleteComponent = ({
  categoriesIngredients,
  pageTheme,
  ingredientsSelected,
  setIngredientsSelected,
}) => {
  useEffect(() => {
    const allIngredients = []
    for (let category of categoriesIngredients) {
      for (let ingredient of category.ingredients) {
        allIngredients.push(ingredient.name)
      }
    }

    if (categoriesIngredients.length != 0) {
      const autoComplete = new AutoComplete({
        threshold: 0,
        selector: "#searchIngredients",
        data: {
          src: allIngredients,
          cache: true,
        },
        resultsList: {
          maxResults: 20,
        },
        resultItem: {
          element: (item, data) => {
            item.style = "display: flex; justify-content: space-between;"
            item.innerHTML = `<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
          ${data.match}
        </span>`
          },
          highlight: true,
        },
        events: {
          input: {
            focus: () => {
              if (autoComplete.input.value.length) {
                autoComplete.start()
              }
            },
            selection: (event) => {
              const value = event.detail.selection.value
              document.getElementById("searchIngredients").value = value

              if (!ingredientsSelected.includes(value)) {
                setIngredientsSelected((oldArray) => [...oldArray, value])
              }
            },
          },
        },
      })
    }
  }, [categoriesIngredients])

  return (
    <div className="autoComplete_wrapper tertiary-font font-light w-full">
      <input
        id="searchIngredients"
        type="text"
        placeholder="Entrez vos produits..."
        autoComplete="off"
        className={`focus:outline focus:outline-[7px] outline-${pageTheme}-primary duration-150 transition-all rounded-lg p-3 shadow-md w-full`}
      />
    </div>
  )
}

export default AutoCompleteComponent
