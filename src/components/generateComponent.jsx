import {useState} from "react"
import {RxCrossCircled} from "react-icons/rx"
import Layout from "./Layout"
import AutoCompleteComponent from "./Autocomplete"

const Generate = ({pageTheme}) => {
  const categoryIngredientsCss =
    "secondary-font text-xl m-12 max-sm:text-center"
  const buttonIngredients = `shadow-lg sm:w-[200px] max-sm:whitespace-nowrap bg-${pageTheme}-primary-translucent sm:m-2 max-sm:mb-6 max-sm:mx-2 rounded-lg p-2 text-lg`
  const [ingredientsSelected, setIngredientsSelected] = useState([
    "Poireau",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
    "aeazea",
  ])

  function callIngredients() {
    return (
      <ul className="flex flex-row flex-wrap sm:justify-left max-sm:justify-center max-sm:overflow-y-auto scroller-thumb scroller tertiary-font max-sm:max-h-[200px]">
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Courgette"
          >
            Courgette
          </button>
        </li>
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Poireau"
          >
            Poireau
          </button>
        </li>
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Courge"
          >
            Courge
          </button>
        </li>
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Carotte"
          >
            Carotte
          </button>
        </li>
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Poivron"
          >
            Poivron
          </button>
        </li>
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Champignon"
          >
            Champignon
          </button>
        </li>
        <li>
          <button
            onClick={(element) =>
              addInIngredientsSelected(
                element.target.value,
                ingredientsSelected,
                setIngredientsSelected
              )
            }
            className={buttonIngredients}
            value="Pomme de terre"
          >
            Pomme de terre
          </button>
        </li>
      </ul>
    )
  }

  function addInIngredientsSelected(value) {
    if (!ingredientsSelected.includes(value)) {
      setIngredientsSelected((oldArray) => [...oldArray, value])
    }
  }

  return (
    <Layout page="Recipes" pagetheme={pageTheme} screensize={+true}>
      <h1 className="text-2xl mt-16 secondary-font sm:ml-36 max-sm:text-center">
        Qu’y a-t-il dans votre cuisine ?
      </h1>
      <div className="sm:pr-[40vw] sm:my-16 sm:ml-12 sm:mx-auto max-sm:flex max-sm:flex-col-reverse max-sm:justify-between max-sm:px-12">
        <div className="justify-between flex flex-col max-sm:mb-16">
          <span>
            <p className={categoryIngredientsCss}>Légumes :</p>
            {callIngredients()}
          </span>
          <span>
            <p className={categoryIngredientsCss}>Féculant :</p>
            {callIngredients()}
            <ul />
          </span>
          <span>
            <p className={categoryIngredientsCss}>Viande :</p>
            {callIngredients()}
            <ul />
          </span>
          <span>
            <p className={categoryIngredientsCss}>Condiment :</p>
            {callIngredients()}
            <ul />
          </span>
        </div>
      </div>
      <div
        className={`sm:fixed sm:top-[20vh] sm:right-[2vw] sm:h-[70vh] sm:p-12 sm:w-[calc(300px+10vw)] sm:rounded-lg sm:bg-black/[.03] max-sm:w-[80%] max-sm:mx-auto max-sm:max-h-[300px] max-sm:mb-[120px]`}
      >
        <span>
          <p className="text-center mb-6 font-bold secondary-font whitespace-nowrap">
            Avez vous d'autres ingrédients ?
          </p>
          <AutoCompleteComponent
            pageTheme={pageTheme}
            ingredientsSelected={ingredientsSelected}
            setIngredientsSelected={setIngredientsSelected}
          />
        </span>
        <button
          className={`max-sm:hidden secondary-font p-2 my-8 bg-${pageTheme}-primary rounded-lg shadow-lg w-full`}
        >
          Valider
        </button>
        <div className="sm:w-full sm:h-[calc(100%-200px)] max-sm:max-h-[200px] max-sm:flex max-sm:flex-row max-sm:flex-wrap max-sm:justify-center max-sm:mt-8 overflow-y-auto scroller-thumb scroller">
          {ingredientsSelected.map((element, index) => (
            <button
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
      </div>
      <button
        className={`sm:hidden w-full py-[15px] secondary-font rounded-t-full bg-${pageTheme}-primary fixed bottom-0 border-t-4 border-black/[.1]`}
      >
        Valider
      </button>
    </Layout>
  )
}

export default Generate
