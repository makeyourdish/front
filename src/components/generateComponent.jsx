import {useState} from "react"
import {RxCrossCircled} from "react-icons/rx"
import Layout from "./Layout"

function Generate({pageTheme}) {
  const categoryIngredientsCss =
    "secondary-font text-2xl m-12 max-sm:text-center"
  const buttonIngredients = `sm:w-[200px] max-sm:whitespace-nowrap bg-${pageTheme}-primary-translucent sm:m-6 max-sm:mb-6 max-sm:mx-6 rounded-lg py-2 px-4 text-lg`
  const [ingredientsSelected, setIngredientsSelected] = useState([])

  const addInIngredientsSelected = (value) => {
    if (!ingredientsSelected.includes(value)) {
      setIngredientsSelected((oldArray) => [...oldArray, value])
    }
  }
  const callIngredients = () => (
    <ul className="flex flex-row sm:flex-wrap justify-left max-sm:overflow-x-scroll scroller-thumb scroller">
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Courgette"
        >
          Courgette
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Poireau"
        >
          Poireau
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Courge"
        >
          Courge
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Carotte"
        >
          Carotte
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Poivron"
        >
          Poivron
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Champignon"
        >
          Champignon
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={buttonIngredients}
          value="Pomme de terre"
        >
          Pomme de terre
        </button>
      </li>
    </ul>
  )

  return (
    <Layout page="Recipes" pagetheme={pageTheme} screensize={+true}>
      <h1 className="text-2xl mt-16 secondary-font sm:ml-36 max-sm:text-center">
        Qu’y a-t-il dans votre cuisine ?
      </h1>
      <div className="sm:pr-[40vh] sm:my-20 sm:ml-12 sm:mx-auto max-sm:flex max-sm:flex-col-reverse max-sm:justify-between max-sm:px-12 max-sm:py- ">
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
      <div className="sm:fixed sm:top-[20vh] sm:right-[5vh] w-[30vh] max-sm:w-[80%] max-sm:mx-auto max-sm:mb-20">
        <span>
          <p className="text-center mb-6 font-bold secondary-font">
            Avez vous d'autres ingrédients ?
          </p>
          <span className="flex flex-row items-center">
            <input
              type="text"
              placeholder="Entrez vos produits..."
              className={`focus:outline focus:outline-[7px] outline-${pageTheme}-primary duration-150 transition-all rounded-lg p-3 w-full shadow-md`}
            />
          </span>
        </span>
        <button
          className={`max-sm:hidden secondary-font p-6 my-8 bg-${pageTheme}-primary rounded-lg shadow-lg w-full`}
        >
          VALIDER
        </button>
        <div className="sm:w-[95%] max-sm:h-[10vh] sm:h-[45vh] max-sm:mt-8 overflow-y-auto scroller-thumb scroller">
          {ingredientsSelected.map((element, index) => (
            <span className="flex flex-row justify-between items-center max-sm:h-6 max-sm:mr-4 sm:mr-8">
              <p className="secondary-font sm:text-xl sm:mb-2">{element}</p>
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
