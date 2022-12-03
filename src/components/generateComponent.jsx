import {useState} from "react"
import {RxCrossCircled} from "react-icons/rx"
import {FiSearch} from "react-icons/fi"
import Layout from "./Layout"

function Generate({pageTheme}) {
  const categoryIngredientsCss = "secondary-font text-2xl m-12"
  const [ingredientsSelected, setIngredientsSelected] = useState([])

  const addInIngredientsSelected = (value) => {
    if (!ingredientsSelected.includes(value)) {
      setIngredientsSelected((oldArray) => [...oldArray, value])
    }
  }
  const callIngredients = () => (
    <ul className="flex flex-row flex-wrap justify-left">
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Courgette"
        >
          Courgette
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Poireau"
        >
          Poireau
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Courge"
        >
          Courge
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Carotte"
        >
          Carotte
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Poivron"
        >
          Poivron
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Champignon"
        >
          Champignon
        </button>
      </li>
      <li>
        <button
          onClick={(element) => addInIngredientsSelected(element.target.value)}
          className={`w-[200px] text-center bg-${pageTheme}-primary-translucent m-6 rounded-lg py-2 px-4 buttonIngredients text-lg`}
          value="Pomme de terre"
        >
          Pomme de terre
        </button>
      </li>
    </ul>
  )

  return (
    <Layout page="Recipes" pagetheme={pageTheme} screensize={+true}>
      <div className="w-[80%] my-20 max-sm:ml-12 sm:mx-auto flex flex-row justify-between">
        <div className="w-[70%] justify-between flex flex-col">
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
        <div className="flex flex-col justify-start fixed right-80">
          <span>
            <p className="text-center mb-6">Avez vous d'autres ingrédients ?</p>
            <span className="flex flex-row items-center">
              <input
                type="text"
                className={`focus:outline focus:outline-[3px] outline-${pageTheme}-primary duration-150 transition-all rounded-lg p-3 w-[300px] shadow-md relative`}
              />
              <button className="absolute right-2">
                <FiSearch className="text-2xl" />
              </button>
            </span>
          </span>
          <button
            className={`secondary-font p-6 my-8 bg-${pageTheme}-primary rounded-lg shadow-lg`}
          >
            VALIDER
          </button>
          <span>
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
    </Layout>
  )
}

export default Generate
