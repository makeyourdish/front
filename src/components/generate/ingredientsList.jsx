const IngredientsList = ({
  categoriesIngredients,
  pageTheme,
  ingredientsSelected,
  setIngredientsSelected,
}) => {
  function callIngredients(category) {
    return (
      <ul className="flex flex-row flex-wrap sm:justify-left max-sm:justify-center overflow-y-auto scroller-thumb scroller tertiary-font max-h-[200px]">
        {category.ingredients.map((ingredient, key) => (
          <li key={key}>
            <button
              onClick={(element) =>
                addInIngredientsSelected(
                  element.target.value,
                  ingredientsSelected,
                  setIngredientsSelected
                )
              }
              className={`shadow-lg max-sm:whitespace-nowrap bg-${pageTheme}-primary-translucent sm:m-2 max-sm:mb-6 max-sm:mx-2 rounded-lg p-2 text-lg`}
              value={ingredient.name}
            >
              {ingredient.name}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  function addInIngredientsSelected(value) {
    if (!ingredientsSelected.includes(value)) {
      setIngredientsSelected((oldArray) => [...oldArray, value])
    }
  }

  return (
    <div className="sm:w-[50vw] sm:my-[5vh] sm:ml-[7vw] sm:mx-auto max-sm:flex max-sm:flex-col-reverse max-sm:justify-between max-sm:px-12">
      <div className="justify-between flex flex-col max-sm:mb-16">
        <ul>
          {categoriesIngredients.map((category, key) => (
            <li key={key}>
              <p className="secondary-font mt-[4vh] mb-[2vh] text-lg max-sm:text-center">
                {category.name} :
              </p>
              {callIngredients(category)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IngredientsList
