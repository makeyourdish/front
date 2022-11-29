/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head"
import Header from "./Header"

const Layout = (props) => {
  const { children, ...otherProps } = props

  // Template for all pages
  return (
    <div {...otherProps}>
      <Head>
        <title>{props.page} - Make Your Dish</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Nous une application pour vous aider à créer des recettes et des cocktails avec ce que vous avez chez vous !"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inria+Sans&family=Inter:wght@700&family=Major+Mono+Display&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className={`${props.pagetheme === "food" && "bg-food-secondary"} 
          ${
            props.pagetheme === "drink" && "bg-drink-secondary"
          } min-h-screen min-w-screen flex flex-col`}
      >
        {/* If you want to hide the header then you can add hideheader={+true} on a page */}
        {!props.hideheader && <Header pagetheme={props.pagetheme} />}

        {/* If screensize={+true} on a page (like homepage) the height of the page will make the size of the window */}
        <main className={`flex-1 ${props.screensize && "flex flex-col"}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
