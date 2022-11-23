import Layout from "../src/components/Layout"

const HomePage = () => {
  return (
    <Layout page="Accueil">
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Make Your Dish</h1>
          <p className="text-2xl">🍷 Page d'accueil à venir 🍖</p>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
