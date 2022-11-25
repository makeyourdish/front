/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head"
import Header from "./Header"

const Layout = (props) => {
  const { children, ...otherProps } = props

  // Template for all pages
  return (
    <div
      {...otherProps}
      className="bg-color-full-no-image min-h-screen min-w-screen h-screen flex flex-col"
    >
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

      <Header headercolor={props.headercolor} />
      <main className="w-full h-full">{children}</main>
    </div>
  )
}

export default Layout
