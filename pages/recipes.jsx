const Recipes = () => {
  function displayElement(nbElement, typeOfElement, idElement) {
    if (typeof document !== "undefined") {
      const element = document.getElementById(idElement)
      element.innerHTML = `<img src="${typeOfElement}" alt="img"></img>`
    }
  }

  return (
    <div className="my-20 m-auto w-[70%]">
      <h1 className="text-4xl">Nos recettes</h1>
      <div className="border-b-[1px] border-black/20 p-8 m-auto w-[60%]">
        <h4 className="mb-8 pl-8 text-2xl ">Titre d'une recette</h4>
        <span className="flex flex-row justify-between">
          <img
            className="rounded-md mr-12"
            src="plat.png"
            alt="image de la recette"
            title="image de la recette"
            width={450}
          ></img>
          <div className="flex flex-col justify-around">
            <p>
              Une pintade farcie au foie gras et aux marrons avec ses légumes
              oubliés, une recette aux couleurs chaleureuses à déguster avec vos
              proches !
            </p>
            <div className="flex flex-row justify-around">
              <p>1h55</p>
              <p>4 personnes</p>
            </div>
            <div className="flex flex-row justify-around">
              <span id="stars">{displayElement(3, "logo", "stars")}</span>
              <span id="priceSlice">
                {displayElement(3, "logo", "priceSlice")}
              </span>
            </div>
          </div>
        </span>
      </div>
    </div>
  )
}

export default Recipes
