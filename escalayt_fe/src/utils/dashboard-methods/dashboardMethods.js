import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL + '/api/v1/ticket';

import { formatDate, newFormatDate } from "../formatDate";

export const fetchTickets = async (token, setActivities, setHasMore, page) => {
  try {
    const response = await axios.get(
      `${apiUrl}/view-all-tickets`,
      {
        params: { page },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;

    const formattedTickets = data.map((ticket) => ({
      ...ticket,
      ticketNumber: ticket.id,
      assignee: ticket.assigneeFullName || "Unassigned",
      dateCreated: newFormatDate(ticket.createdAt),
    }));

    // console.log("Fetched tickets:", formattedTickets);
    setActivities(formattedTickets);

    setHasMore(fetchTickets.length > 0);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};


export const fetchFilteredTickets = async (token, page, setTickets, setTotalPages, filters) => {
  // const apiUrl = base + '/api/v1/ticket/';
 

  // Construct query parameters
  const params = new URLSearchParams();
  params.append('page', page);
  
  // Handle multiple values for filters
  Object.entries(filters).forEach(([key, values]) => {
      values.forEach(value => params.append(key, value));
  });

  try {
    const response = await axios.get(apiUrl + "/filter-new", {
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });


    const formattedTickets = response.data.content.map((ticket) => ({
      ...ticket,
      ticketNumber: ticket.id,
      assignee: ticket.assigneeFullName || "Unassigned",
      dateCreated: newFormatDate(ticket.createdAt),
    }));
    // setTickets(response.data.content);
    setTickets(formattedTickets);
    setTotalPages(response.data.totalPages); // Adjust if the actual pagination response differs
  } catch (error) {
    console.error('Error fetching tickets', error);
  }
};

export const fetchLatestThreeOpenTickets = async (token, setTickets, setLoading, setError,) => {
  setLoading(true);
  try {
    const delay = 200; // Adjust delay in milliseconds (2 seconds here)
    await new Promise((resolve) => setTimeout(resolve, delay));
    const response = await axios.get(`${apiUrl}/admin/open-tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    setTickets(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching latest three open tickets:', error);
    console.log("error",error);
    setError(error);
  } finally {
    setLoading(false);
    
  }
};

export const fetchLatestThreeResolvedTickets = async (token, setTickets, setLoading, setError) => {
  setLoading(true);
  try {
    const delay = 700; // Adjust delay in milliseconds (2 seconds here)
    await new Promise((resolve) => setTimeout(resolve, delay));
    const response = await axios.get(`${apiUrl}/admin/resolved-tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);
    console.log("resolved ",response);
  } catch (error) {
    console.error('Error fetching latest three open tickets:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export const fetchLatestThreeInprogressTickets = async (token, setTickets, setLoading, setError) => {
  setLoading(true);
  try {
    const delay = 700; // Adjust delay in milliseconds (2 seconds here)
    await new Promise((resolve) => setTimeout(resolve, delay));
    const response = await axios.get(`${apiUrl}/admin/inprogres-tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);
    console.log("in progress ",response);

  } catch (error) {
    console.error('Error fetching latest three open tickets:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export const fetchTicketCount = async (token, setTicketTotalCount, setOpenTicketCount, setResolvedTicketCount, setOngoingTicketCount) => {
  try {

    const response = await axios.get(`${apiUrl}/count`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
 
    setTicketTotalCount(response.data.totalTickets);
    setOpenTicketCount(response.data.openTickets);
    setResolvedTicketCount(response.data.resolvedTickets);
    setOngoingTicketCount(response.data.inProgressTickets);
  } catch (error) {
    console.error('Error:', error);
    // setError(error);
  } finally {
    // setLoading(false);
  }
}


 // Sorting function
export const sortTickets = (sort, tickets) => {
  const priorityOrder = ["HIGH", "MEDIUM", "LOW"];
  const statusOrder = ["OPEN", "IN_PROGRESS", "RESOLVED"];

  return [...tickets].sort((a, b) => {
    if (sort === "priority") {
      return (
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    }
    if (sort === "status") {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    }
    if (sort === "assigneeId") {
      return a.assignee.localeCompare(b.assignee);
    }
    if (sort === "categoryId") {
      return a.ticketCategoryName.localeCompare(b.ticketCategoryName);
    }
    return 0;
  });
};
