import {useState} from "react"
import {RxCrossCircled} from "react-icons/rx"
import {FiSearch} from "react-icons/fi"
import {BsArrowUpCircle} from "react-icons/bs"
import Layout from "./Layout"

function Generate({pageTheme}) {
  const categoryIngredientsCss =
    "secondary-font text-2xl sm:m-12 max-sm:my-12 max-sm:text-center"
  const buttonIngredients = `w-[200px] bg-${pageTheme}-primary-translucent sm:m-6 max-sm:mx-2 max-sm:mb-6 rounded-lg py-2 px-4 buttonIngredients text-lg`
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
      <div className="flex justify-between sm:w-[80%] sm:my-20 sm:ml-12 sm:mx-auto sm:flex-row max-sm:p-12 max-sm:flex-col-reverse">
        <div className="sm:w-[70%] justify-between flex flex-col max-sm:mb-16">
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
        <div className="flex flex-col justify-start sm:fixed sm:right-80">
          <span className="max-sm:mb-8">
            <p className="text-center mb-6 font-bold secondary-font">
              Avez vous d'autres ingrédients ?
            </p>
            <span className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Entrez vos produits..."
                className={`focus:outline focus:outline-[3px] outline-${pageTheme}-primary duration-150 transition-all rounded-lg p-3 sm:w-[300px] max-sm:w-full shadow-md relative`}
              />
              <button className="absolute sm:right-2 max-sm:right-14">
                <FiSearch className="text-2xl" />
              </button>
            </span>
          </span>
          <button
            className={`max-sm:hidden secondary-font p-6 my-8 bg-${pageTheme}-primary rounded-lg shadow-lg`}
          >
            VALIDER
          </button>
          <span className="max-sm:hidden">
            {ingredientsSelected.map((element, index) => (
              <span className="flex flex-row justify-between w-[90%]">
                <p className="secondary-font text-xl m-4">{element}</p>
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
          </span>
        </div>
      </div>
      <button
        className={`sm:hidden w-full p-4 secondary-font rounded-t-full bg-${pageTheme}-primary fixed bottom-0`}
      >
        Valider
      </button>
    </Layout>
  )
}

export default Generate
