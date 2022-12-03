import Layout from "./Layout"
import { useState } from "react"
import { RxCrossCircled } from "react-icons/rx"
import { FiSearch } from "react-icons/fi"

const Generate = ({ pageTheme }) => {
  const categoryIngredientsCss = "secondary-font text-2xl"
  const spanCss = undefined
  const [ingredientsSelected, setIngredientsSelected] = useState([])

  const addInIngredientsSelected = (value) => {
    if (!ingredientsSelected.includes(value)) {
      setIngredientsSelected((oldArray) => [...oldArray, value])
    }
  }

  return (
    <Layout page="Recipes" pagetheme={pageTheme} screensize={+true}>
      <div className="w-[80%] h-[100%] mt-24 max-sm:ml-12 sm:mx-auto flex flex-row justify-between bg-gray-200">
        <div className="w-[70%] justify-between flex flex-col">
          <span className={spanCss}>
            <p className={categoryIngredientsCss}>Légumes :</p>
            <ul className="flex flex-row flex-wrap justify-left">
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Courgette"
                >
                  Courgette
                </button>
              </li>
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Poireau"
                >
                  Poireau
                </button>
              </li>
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Courge"
                >
                  Courge
                </button>
              </li>
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Carotte"
                >
                  Carotte
                </button>
              </li>
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Poivron"
                >
                  Poivron
                </button>
              </li>
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Champignon"
                >
                  Champignon
                </button>
              </li>
              <li className="w-[120px] text-center bg-red-200 m-6">
                <button
                  onClick={(element) =>
                    addInIngredientsSelected(element.target.value)
                  }
                  className="Btn"
                  value="Pomme de terre"
                >
                  Pomme de terre
                </button>
              </li>
            </ul>
          </span>
          <span className={spanCss}>
            <p className={categoryIngredientsCss}>Féculant :</p>
            <ul>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
            </ul>
          </span>
          <span className={spanCss}>
            <p className={categoryIngredientsCss}>Viande :</p>
            <ul>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
            </ul>
          </span>
          <span className={spanCss}>
            <p className={categoryIngredientsCss}>Condiment :</p>
            <ul>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
              <li className="w-[120px] text-center bg-red-200 m-6"></li>
            </ul>
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-center mb-6">Avez vous d'autres ingrédients ?</p>
          <span className="mb-24 flex flex-row items-center">
            <input
              type="text"
              className={`focus:outline focus:outline-[3px] outline-${pageTheme}-primary duration-150 transition-all rounded-lg p-3 w-[300px] shadow-md`}
            ></input>
            <button
              onClick={(element) =>
                addInIngredientsSelected(element.target.value)
              }
              className="relative right-8"
            >
              <FiSearch className="text-2xl" />
            </button>
          </span>
          <span>
            {ingredientsSelected.map((element, index) => {
              return (
                <span className="flex flex-row justify-between w-[90%]">
                  <p className="secondary-font text-xl m-4">{element}</p>
                  <button
                    onClick={() =>
                      setIngredientsSelected(
                        ingredientsSelected.filter(
                          (element, id) => id !== index
                        )
                      )
                    }
                    className="text-red-500"
                  >
                    <RxCrossCircled />
                  </button>
                </span>
              )
            })}
          </span>
          <button className="secondary-font p-6 bg-drink-primary rounded-lg shadow-lg">
            VALIDER
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Generate
