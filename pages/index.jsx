import Image from "next/image"
import Link from "next/Link"
import Layout from "../src/components/Layout"
import bgImageTwoColors from "/public/images/background/Separation.png"

// 🔽🔽🔽 Images 🔽🔽🔽
const PoeleImg = () => {
  const src = "/images/background/Poele.png"
  const otherClass =
    "absolute -bottom-16 -left-12 md:-bottom-32 md:left-12 z-10"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={420} height={290} alt="food" />
      </div>
      <div className={`${otherClass} block md:hidden`}>
        <Image src={src} width={420 / 2} height={290 / 2} alt="food" />
      </div>
    </>
  )
}

const SpatuleImg = () => {
  const src = "/images/background/Spatule.png"
  const otherClass = "absolute -left-20 -bottom-2 md:-left-28 md:-bottom-1"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={200} height={200} alt="food" />
      </div>
      <div className={`${otherClass} block md:hidden`}>
        <Image src={src} width={200 / 1.5} height={200 / 1.5} alt="food" />
      </div>
    </>
  )
}

const BourguignonImg = () => {
  const src = "/images/background/Bourguignon.png"

  return (
    <>
      <div className="hidden md:block">
        <Image src={src} width={250} height={250} alt="food" />
      </div>
      <div className="block md:hidden">
        <Image src={src} width={250 / 1.5} height={250 / 1.5} alt="food" />
      </div>
    </>
  )
}

const CocktailImg = () => {
  const src = "/images/background/Cocktails.png"

  return (
    <>
      <div className="hidden md:block z-20">
        <Image src={src} width={250} height={250} alt="drink" />
      </div>
      <div className="block md:hidden z-20">
        <Image src={src} width={250 / 1.5} height={250 / 1.5} alt="drink" />
      </div>
    </>
  )
}

const FeuilleGImg = () => {
  const src = "/images/background/FeuilleG.png"
  const otherClass = "absolute -bottom-2 left-0 z-10"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={250} height={250} alt="drink" />
      </div>
      <div className={`${otherClass} block md:hidden`}>
        <Image src={src} width={250 / 2} height={250 / 2} alt="drink" />
      </div>
    </>
  )
}

const EllipseImg = () => {
  const src = "/images/background/Ellipsejaune.png"
  const otherClass = "absolute inset-x-auto -bottom-2"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={800} height={100} alt="drink" />
      </div>
      <div className={`${otherClass} block md:hidden`}>
        <Image src={src} width={800 / 2} height={100 / 2} alt="drink" />
      </div>
    </>
  )
}

const FeuilleDImg = () => {
  const src = "/images/background/FeuilleD.png"
  const otherClass = "absolute -bottom-2 right-0 z-10"

  return (
    <>
      <div className={`${otherClass} hidden md:block`}>
        <Image src={src} width={250} height={250} alt="drink" />
      </div>
      <div className={`${otherClass} block md:hidden`}>
        <Image src={src} width={250 / 2} height={250 / 2} alt="drink" />
      </div>
    </>
  )
}

// 🔽🔽🔽 Page render 🔽🔽🔽
const HomePage = () => {
  const buttonStyle =
    "bg-white text-center px-9 py-2 md:px-12 md:py-3 md:text-xl secondary-font rounded-2xl drop-shadow-md transition transform hover:scale-110 hover:bg-white/75"

  return (
    <Layout page="Accueil" pagetheme="food" screensize={+true}>
      <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-evenly bg-food-secondary relative py-2">
        <PoeleImg />
        <div className="flex flex-col md:flex-row z-30">
          <Link href="/recipes/make">
            <a className={`${buttonStyle} mb-4 md:mb-0 md:mr-4`}>
              Génère ton plat
            </a>
          </Link>
          <Link href="/recipes">
            <a className={buttonStyle}>Notre cuisine</a>
          </Link>
        </div>
        <div className="relative z-20">
          <SpatuleImg />
          <BourguignonImg />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Image src={bgImageTwoColors} alt="" />
      </div>

      <div className="w-full flex-1 flex flex-col-reverse md:flex-row items-center justify-evenly bg-drink-secondary overflow-hidden relative py-2">
        <CocktailImg />
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

        <FeuilleGImg />
        <EllipseImg />
        <FeuilleDImg />
      </div>
    </Layout>
  )
}

export default HomePage
