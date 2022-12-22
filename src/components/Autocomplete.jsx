import AutoComplete from "@tarekraafat/autocomplete.js"
import {useEffect} from "react"

const AutoCompleteComponent = ({
  pageTheme,
  ingredientsSelected,
  setIngredientsSelected,
}) => {
  // let autoComplete

  useEffect(() => {
    const autoComplete = new AutoComplete({
      threshold: 2,
      selector: "#searchIngredients",
      data: {
        src: ["patate", "patati", "patatou", "patatra", "Courgette", "Poireau"],
        cache: true,
      },
      resultsList: {
        maxResults: 5,
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
            if (autoComplete.input.value.length) {autoComplete.start()}
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
  }, [])

  /*useEffect(()=> {
    if (autoComplete) {
    autoComplete.events.input.selection = (event) => {
    const value = event.detail.selection.value
    document.getElementById("searchIngredients").value = value
    if (!ingredientsSelected.includes(value)) {
      setIngredientsSelected((oldArray) => [...oldArray, value])
      }
    }
},[ingredientsSelected])*/

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
