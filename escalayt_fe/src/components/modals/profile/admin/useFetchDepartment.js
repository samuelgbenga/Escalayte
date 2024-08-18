import { useEffect, useState } from "react"

export function useFetchDepartment(url, options = {}) {
  const [data2, setData2] = useState()
  const [isError2, setIsError2] = useState(false)
  const [isLoading2, setIsLoading2] = useState(true)

  useEffect(() => {
    setData2(undefined)
    setIsError2(false)
    setIsLoading2(true)

    const controller = new AbortController()

    // connect with the backend url
    fetch(url, { signal: controller.signal, ...options })

        // get the information and 
        // and convert to json
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
        return Promise.reject(res)
      })

      // load it to the setData
      .then(setData2)

      // catch the error
      // set the error to true
      .catch(e => {
        if (e.name === "AbortError") return
        setIsError2(true)
        console.log(e);
      })

      // final
      .finally(() => {
        if (controller.signal.aborted) return
        setIsLoading2(false)
      })

    return () => {
      controller.abort()
    }
  }, [url])

  return { data2, isError2, isLoading2 }
}
