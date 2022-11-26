import { useState, useEffect } from "react" // custom hook to get window size

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    var { innerWidth: width, innerHeight: height } = window
  }

  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}
