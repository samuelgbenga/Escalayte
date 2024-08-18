import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL + '/api/v1/ticket';

export const useFetchTicketActivities = (token, page) => {
  const [activities, setActivities] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [ticketActivitiesLoading, setTicketActivitiesLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setTicketActivitiesLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/view-all-tickets`, {
          params: { page },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response;
        console.log("data fetched",data);
        const formattedTickets = data.map((ticket) => ({
          ...ticket,
          ticketNumber: ticket.id,
          assignee: ticket.assigneeFullName || "Unassigned",
          dateCreated: formatDate(ticket.createdAt),
        }));

        setActivities(formattedTickets);
        setHasMore(data.length > 0);
      } catch (error) {
        setError(error);
      } finally {
        setTicketActivitiesLoading(false);
      }
    };

    fetchTickets();
  }, [token, page]);

  return { activities, hasMore, ticketActivitiesLoading, error };
};

export default useFetchTicketActivities;
