import Link from "next/link"
import Image from "next/image"
import Layout from "../src/components/Layout"
import useWindowDimensions from "../src/components/services/useWindowDimantions"
import bgImageTwoColors from "/public/images/background/Separation.png"

const HomePage = () => {
  const { width } = useWindowDimensions() // get window size
  const buttonStyle =
    "bg-white text-center px-9 py-3 md:px-12 text-xl secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  return (
    <Layout page="Accueil" headercolor="food" screensize={+true}>
      <div className="flex flex-col h-full">
        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-evenly bg-food-secondary relative">
          <div className="absolute -bottom-16 -left-12 md:-bottom-32 md:left-12 z-10">
            <Image
              src="/images/background/Poile.png"
              width={width >= 768 ? 420 : 420 / 2}
              height={width >= 768 ? 290 : 290 / 2}
              alt="food"
            />
          </div>
          <div className="flex flex-col md:flex-row z-30">
            <Link href="/recipes/make">
              <a className={`${buttonStyle} mb-4  md:mb-0 md:mr-4`}>
                Génère ton plat
              </a>
            </Link>
            <Link href="/recipes">
              <a className={buttonStyle}>Notre cuisine</a>
            </Link>
          </div>

          <div className="relative z-20">
            <div className="absolute -left-20 -bottom-2 md:-left-28 md:-bottom-1">
              <Image
                src="/images/background/Spatule.png"
                width={width >= 768 ? 200 : 200 / 1.5}
                height={width >= 768 ? 200 : 200 / 1.5}
                alt="food"
              />
            </div>
            <Image
              src="/images/background/Bourguignon.png"
              width={width >= 768 ? 250 : 250 / 1.5}
              height={width >= 768 ? 250 : 250 / 1.5}
              alt="food"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image src={bgImageTwoColors} alt="" />
        </div>

        <div className="w-full flex-1 flex flex-col-reverse md:flex-row items-center justify-evenly bg-drink-secondary overflow-hidden	relative ">
          <Image
            src="/images/background/Cocktails.png"
            width={width >= 768 ? 250 : 250 / 1.5}
            height={width >= 768 ? 250 : 250 / 1.5}
            alt="food"
            className="flex z-20"
          />
          <div className="flex flex-col md:flex-row z-30">
            <Link href="/drinks/make">
              <a className={`${buttonStyle} mb-4 md:mb-0 md:mr-4`}>
                Génère ton cocktail
              </a>
            </Link>
            <Link href="/drinks">
              <a className={buttonStyle}>Nos cocktails</a>
            </Link>
          </div>

          <div className="absolute -bottom-2 left-0 z-10">
            <Image
              src="/images/background/FeuilleG.png"
              width={width >= 768 ? 250 : 250 / 1.5}
              height={width >= 768 ? 250 : 250 / 1.5}
              alt="drink"
            />
          </div>
          <div className="absolute inset-x-auto -bottom-2">
            <Image
              src="/images/background/Ellipsejaune.png"
              width={width >= 768 ? 800 : 800 / 1.5}
              height={width >= 768 ? 100 : 100 / 1.5}
              alt="food"
            />
          </div>
          <div className="absolute -bottom-2 right-0 z-10">
            <Image
              src="/images/background/FeuilleD.png"
              width={width >= 768 ? 250 : 250 / 1.5}
              height={width >= 768 ? 250 : 250 / 1.5}
              alt="drink"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
