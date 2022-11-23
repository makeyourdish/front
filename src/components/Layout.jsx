
import Head from "next/head"

const Layout = (props) => {
  const { children, ...otherProps } = props 

  // Template for all pages
  return (
    <div {...otherProps}>
      <Head>
        <title>{props.page} - Make Your Dish</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Nous une application pour vous aider à créer des recettes et des cocktails avec ce que vous avez chez vous !" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout