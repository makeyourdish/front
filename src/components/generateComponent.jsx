import {useState} from "react"
import {RxCrossCircled} from "react-icons/rx"
import Layout from "./Layout"
import AutoCompleteComponent from "./Autocomplete"

const Generate = ({pageTheme}) => {
  const categoryIngredientsCss =
    "secondary-font text-xl m-12 max-sm:text-center"
  const buttonIngredients = `shadow-lg sm:w-[200px] max-sm:whitespace-nowrap bg-${pageTheme}-primary-translucent sm:m-2 max-sm:mb-6 max-sm:mx-2 rounded-lg p-2 text-lg`
  const [ingredientsSelected, setIngredientsSelected] = useState([
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
    return (<ul className="flex flex-row sm:flex-wrap justify-left max-sm:overflow-x-scroll scroller-thumb scroller tertiary-font">
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Courgette"
        >
          Courgette
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Poireau"
        >
          Poireau
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Courge"
        >
          Courge
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Carotte"
        >
          Carotte
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Poivron"
        >
          Poivron
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Champignon"
        >
          Champignon
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value, ingredientsSelected, setIngredientsSelected)}
          className={buttonIngredients}
          value="Pomme de terre"
        >
          Pomme de terre
        </button>
      </li>
    </ul>)
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
      <div className="sm:pr-[50vh] sm:my-16 sm:ml-12 sm:mx-auto max-sm:flex max-sm:flex-col-reverse max-sm:justify-between max-sm:px-12">
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
      <div className="sm:fixed sm:top-[27vh] sm:right-[7vh] w-[40vh] max-sm:w-[80%] max-sm:m-auto max-sm:mb-24">
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
        <div className="sm:w-[95%] h-[15rem] max-sm:mt-8 overflow-y-auto scroller-thumb scroller">
          {ingredientsSelected.map((element, index) => (
            <span className="flex flex-row justify-between items-center max-sm:h-6 max-sm:mr-4 sm:mr-8">
              <p className="secondary-font sm:mb-2">{element}</p>
              <button
                onClick={() =>
                  setIngredientsSelected(
                    ingredientsSelected.filter((element, id) => id !== index)
                  )
                }
                className="text-red-500"
              >
                <RxCrossCircled />
              </button>
            </span>
          ))}
        </div>
      </div>
      <button
        className={`sm:hidden w-full p-4 secondary-font rounded-t-full bg-${pageTheme}-primary fixed bottom-0 border-t-4 border-black/[.1]`}
      >
        Valider
      </button>
    </Layout>
  )
}

export default Generate