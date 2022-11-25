import Image from "next/image"
import Layout from "../src/components/Layout"
import bgImageTwoColors from "/public/images/background/Separation.png"

const HomePage = () => {
  return (
    <Layout page="Accueil" headercolor="food">
      <div className="flex flex-col border h-full">
        <div className="w-full flex-1 text-center bg-food-secondary border border-green-500">
          <p className="text-2xl">🍖 Recettes à venir 🍖</p>
        </div>
        <div className="flex flex-none items-center justify-center">
          <Image src={bgImageTwoColors} alt="" />
        </div>
        <div className="w-full flex-1 text-center bg-drink-secondary border border-green-500">
          <p className="text-2xl">🍷 Cocktails à venir 🍷</p>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
