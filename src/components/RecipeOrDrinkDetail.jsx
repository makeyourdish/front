/* eslint-disable @next/next/no-img-element */
import { FaEuroSign } from "react-icons/fa"
import { ImSad2 } from "react-icons/im"
import { IoClose } from "react-icons/io5"
import Loader from "./Loader"

const PriceRender = ({ price }) => {
  let priceRender = []

  for (let i = 1; i <= price; i++) {
    priceRender = [
      ...priceRender,
      <span key={i}>
        <FaEuroSign />
      </span>,
    ]
  }

  return <div className="flex text-3xl">{priceRender}</div>
}

const IngredientsRender = ({ ingredients }) => {
  return (
    <ul className="flex items-center justify-evenly text-lg md:text-xl flex-wrap font-semibold">
      {ingredients.map((ingredient) => (
        <li
          key={ingredient.id}
          className="flex flex-col items-center text-center"
        >
          {ingredient.ingredient.imageUrl ? (
            <img
              src={ingredient.ingredient.imageUrl}
              alt="Image de l'ingrédient"
            />
          ) : (
            <div className="w-16 h-16 bg-white rounded-full shadow-md mb-2 flex items-center justify-center">
              <IoClose className="text-4xl text-gray-400" />
            </div>
          )}

          <p>
            {ingredient.ingredient.name}
            {!ingredient.quantityType && ` - x ${ingredient.quantity}`}
            {ingredient.quantityType &&
              ` - ${ingredient.quantity} ${ingredient.quantityType}`}
          </p>
        </li>
      ))}
    </ul>
  )
}

const StepsRender = ({ steps }) => {
  return (
    <ul className="flex flex-col items-center justify-center text-lg md:text-xl flex-wrap font-semibold">
      {steps.map((step, index) => (
        <li key={index} className="text-center mb-3">
          <p>
            Etape {index + 1} - {step}
          </p>
        </li>
      ))}
    </ul>
  )
}

const RecipeOrDrinkDetail = ({ recipeOrDrink, loading, error }) => {
  if (loading) {
    return (
      <section className="flex items-center justify-center flex-grow">
        <Loader
          color="color"
          message="Chargement des informations de la recette"
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex items-center justify-center flex-grow">
        <div className="w-full mb-7 py-2 flex items-center justify-center text-center font-bold text-2xl rounded">
          <ImSad2 className="text-5xl mr-3" /> {error}
        </div>
      </section>
    )
  }

  return (
    <section className="pt-12 w-10/12 xl:w-3/5 mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between mb-10">
        <div className="md:w-1/2 md:mr-5">
          <img
            className="bg-white rounded-3xl"
            src={recipeOrDrink.imageUrl}
            alt="image de la recette ou du cocktail"
          />
        </div>
        <div className="md:w-1/2 md:ml-5">
          <h2 className="secondary-font text-2xl md:text-4xl mb-5">
            {recipeOrDrink.name}
          </h2>
          <p className="tertiary-font text-lg md:text-xl text-justify mb-5">
            {recipeOrDrink.description}
          </p>
          <p className="tertiary-font text-lg md:text-xl text-justify mb-5">
            <span className="font-bold">Temps de préparation :</span>{" "}
            {recipeOrDrink.preparationTime}
          </p>
          <div className="tertiary-font text-justify mb-5 flex items-center justify-between">
            <PriceRender price={recipeOrDrink.priceRange} />
            <p className="font-bold  text-xl md:text-2xl">
              {recipeOrDrink.difficulty[0].toUpperCase() +
                recipeOrDrink.difficulty.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-black pt-6 mb-10">
        <h3 className="secondary-font text-center text-xl md:text-2xl mb-4">
          Ingrédients :
        </h3>
        <IngredientsRender ingredients={recipeOrDrink.ingredients} />
      </div>

      <div className="border-t-2 border-black pt-6 mb-10">
        <h3 className="secondary-font text-center text-xl md:text-2xl mb-4">
          Préparation :
        </h3>
        <StepsRender steps={recipeOrDrink.step.split(";")} />
      </div>
    </section>
  )
}

export default RecipeOrDrinkDetail
