import Link from "next/link"

const Banner = () => {
  return (
    <div>
      <Link href="/recipes">
        <button>Les recettes</button>
      </Link>
    </div>
  )
}

export default Banner
