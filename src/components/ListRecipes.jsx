import Layout from "./Layout"

const ListRecipes = (pageTheme) => {
  return (
    <Layout page="Recipes" pagetheme={pageTheme.pageTheme} screensize={+true}>
      <div className="my-20">
        <h1 className="text-4xl secondary-font mb-16 max-sm:text-center sm:pl-[25%]">
          Nos recettes
        </h1>
        <div className="border-b-[1px] border-black/20 p-8 m-auto  w-[80%] tertiary-font">
          <h4 className="mb-8 max-sm:text-center sm:pl-8 text-3xl font-bold">
            Titre d'une recette
          </h4>
          <span className="flex max-sm:flex-col sm:flex-row justify-between">
            <img
              className="rounded-md max-sm:mb-12 max-sm:m-auto sm:mr-12"
              src="plat.png"
              alt="image de la recette"
              title="image de la recette"
              width={400}
            ></img>
            <div className="flex flex-col max-sm:text-center justify-around text-xl">
              <p className="max-sm:mb-12">
                Une pintade farcie au foie gras et aux marrons avec ses légumes
                oubliés, une recette aux couleurs chaleureuses à déguster avec
                vos proches !
              </p>
              <div className="flex flex-row justify-around max-sm:mb-6">
                <p>1h55</p>
                <p>4 personnes</p>
              </div>
              <div className="flex flex-row justify-around">
                <span id="stars">3</span>
                <span id="priceSlice">4</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </Layout>
  )
}

export default ListRecipes
