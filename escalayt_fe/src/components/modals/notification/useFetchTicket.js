import { useEffect, useState } from "react";

export function useFetchTicket(url, options = {}) {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(undefined);
    setIsError(false);
    setIsLoading(true);

    const controller = new AbortController();

    // connect with the backend url
    fetch(url, { signal: controller.signal, ...options })
      // get the information and
      // and convert to json
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })

      // load it to the setData
      .then(setData)

      // catch the error
      // set the error to true
      .catch((e) => {
        if (e.name === "AbortError") return;

        setIsError(true);
      })

      // final
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isError, isLoading };
}
