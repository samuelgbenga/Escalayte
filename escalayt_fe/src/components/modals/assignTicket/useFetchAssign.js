import { set } from "firebase/database";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function useFetchAssign(url, options = {},
  ticket, 
  fetchTickets, 
  setActivities, 
  setHasMore, 
  page,
  fetchLatestThreeOpenTickets, 
  fetchLatestThreeInprogressTickets, 
  fetchLatestThreeResolvedTickets, 
  setTickets, 
  setIsTicketCardLoading, 
  setTicketsError,
  fetchTicketCount, 
  setTicketTotalCount, 
  setOpenTicketCount, 
  setResolvedTicketCount, 
  setOngoingTicketCount,

) {

  const [done, setDone] = useState(false);
  const [data1, setData1] = useState()
  const [isError1, setIsError1] = useState(false)
  const [isLoading1, setIsLoading1] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setData1(undefined)
      setIsError1(false)
      setIsLoading1(true)
  
      const controller = new AbortController()
  
      try {
        const res = await fetch(url, { signal: controller.signal, ...options })
  
        if (res.status === 200) {
          if (url) {
            toast.success("Ticket assigned successfully");
            setDone(true);
          }
          const data = await res.json()
          setData1(data)
        } else {
          throw res
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          setIsError1(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading1(false)
        }
      }
  
      return () => {
        controller.abort()
      }
    }
  
    fetchData()
  }, [url, options])
  

  // useEffect(() => {
  //   setData1(undefined)
  //   setIsError1(false)
  //   setIsLoading1(true)

  //   const controller = new AbortController()

  //   // connect with the backend url
  //   fetch(url, { signal: controller.signal, ...options })

  //       // get the information and 
  //       // and convert to json
  //     .then(res => {
  //       if (res.status === 200) {
  //         if(url){
  //           toast.success("Ticket assigned successfully");
  //           fetchLatestThreeOpenTickets(
  //             token,
  //             setTickets,
  //             setIsTicketCardLoading,
  //             setTicketsError,
  //           );
  //           fetchLatestThreeInprogressTickets(
  //             token,
  //             setTickets,
  //             setIsTicketCardLoading,
  //             setTicketsError
  //           );
  //           fetchLatestThreeResolvedTickets(
  //             token,
  //             setTickets,
  //             setIsTicketCardLoading,
  //             setTicketsError
  //           );
  //           fetchTickets(token, setActivities, setHasMore, page);
  //         }
  //         return res.json()
  //       }
  //       return Promise.reject(res)
  //     })

  //     // load it to the setData
  //     .then(setData1)

  //     // catch the error
  //     // set the error to true
  //     .catch(e => {
  //       if (e.name === "AbortError") return
  //       setIsError1(true)
  //      // console.log(e);
  //     })

  //     // final
  //     .finally(() => {
  //       if (controller.signal.aborted) return
  //       setIsLoading1(false)
  //     })

  //   return () => {
  //     controller.abort()
  //   }
  // }, [url, options])

  return { data1, isError1, isLoading1, done }
}
