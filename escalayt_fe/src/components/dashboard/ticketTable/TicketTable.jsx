import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './TicketTable.module.css';
import updown from '../../../assets/images/updown.png';
import thcell from '../../../assets/images/Checkbox.svg';
import redellipse from '../../../assets/images/redellipse.png';
import orangeellipse from '../../../assets/images/orangellipse.png';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IMAGES from "../../../assets/index";

 // import url from .env file
 const apiUrl = import.meta.env.VITE_APP_API_URL;

const TicketTable = ({ activities, setPage, page ,

  fetchTickets,
  setActivities, 
  setHasMore, 
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
  setOngoingTicketCount
}) => {

 // Token from local storage
  const token = localStorage.getItem("token");
  const fetchDatas = async () => {
    await fetchTicketCount(
      token,
      setTicketTotalCount,
      setOpenTicketCount,
      setResolvedTicketCount,
      setOngoingTicketCount
    )
    
    await fetchLatestThreeInprogressTickets(
      token,
      setTickets,
      setIsTicketCardLoading,
      setTicketsError
    );
    await fetchLatestThreeResolvedTickets(
      token,
      setTickets,
      setIsTicketCardLoading,
      setTicketsError
    );
    await fetchLatestThreeOpenTickets(
      token,
      setTickets,
      setIsTicketCardLoading,
      setTicketsError,
    );
    await fetchTickets(token, setActivities, setHasMore, page);
  
  }

 

  // State to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // State to track tickets selected on the table
  const [selectedTickets, setSelectedTickets] = useState([]);

  const handleSelect = (id) => {
    setSelectedTickets(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(ticketId => ticketId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    // console.log(selectedTickets);
  };



  const handleNextPage = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleTableDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async (ticketId) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      const response = await axios.delete(`${apiUrl}/api/v1/ticket/category/ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Ticket deleted successfully:', response.data);
      // alert(response.data.responseMessage); // Notify the user about the deletion
      toast.success('Ticket deleted successfully');
      fetchDatas();
    } catch (error) {
      console.error('Error deleting ticket:', error.response ? error.response.data : error.message);
      // alert('Error deleting ticket');
      toast.error('Error deleting ticket');
    }
  }

  const handleResolve = async (ticketId) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  
    try {
      const response = await axios.post(`${apiUrl}/api/v1/ticket/${ticketId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Ticket resolved successfully:', response.data);
      toast.success('Ticket resolved successfully');
      fetchDatas();
    } catch (error) {
      console.error('Error resolving ticket:', error.response ? error.response.data : error.message);
      toast.error('Error resolving ticket');
      // Handle the error scenario, e.g., showing an error message to the user
    }
  };

  const handleResolveMultiple = async () => {
    const token = localStorage.getItem('token');

    if (selectedTickets.length === 0) {
      toast.error('No tickets selected for resolving');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/v1/ticket/resolve`, selectedTickets, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Tickets resolved successfully:', response.data);
      toast.success('Tickets resolved successfully');
      fetchDatas();
      // Optionally update UI here
    } catch (error) {
      console.error('Error resolving tickets:', error.response ? error.response.data : error.message);
      toast.error('Error resolving tickets');
    }
  };

  const handleDeleteMultiple = async () => {
    const token = localStorage.getItem('token');

    console.log(selectedTickets);

    try {
      const response = await axios.delete(`${apiUrl}/api/v1/ticket/delete`, {
        data: selectedTickets,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Tickets deleted successfully:', response.data);
      toast.success('Tickets deleted successfully');
      fetchDatas();
     
    } catch (error) {
      console.error('Error deleting tickets:', error.response ? error.response.data : error.message);
      toast.error('Error deleting tickets');
    }
  };


  return (
    <div className={styles.ticketTableContainer}>
      {
        activities.length > 0 ?
        <table className={`${styles.ticketTable} min-w-full bg-white border border-gray-200`}>
        <thead className='tn_text'>
          <tr className="bg_s_color">
            <th><img src={thcell} alt="Checkbox" /></th>
            <th>Ticket Number</th>
            <th>Title</th>
            <th>
              <div className='flex items-center gap-1.5'>
                <div>Priority</div>
                <div><img src={updown} className='max-w-full h-auto' alt="updown" /></div>
              </div>
            </th>
            <th>
              <div className='flex items-center gap-1.5'>
                <div>Assignee</div>
                <div><img src={updown} className='max-w-full h-auto' alt="updown" /></div>
              </div>
            </th>
            <th>
              <div className='flex items-center gap-1.5'>
                <div>Status</div>
                <div><img src={updown} className='max-w-full h-auto' alt="updown" /></div>
              </div>
            </th>
            <th>
              <div className='flex items-center gap-1.5'>
                <div>Category</div>
                <div><img src={updown} className='max-w-full h-auto' alt="updown" /></div>
              </div>
            </th>
            <th>Date Created</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='sm_text'>
          {activities.map(ticket => (
            <tr key={ticket.id}>
              
              <td>
                <img
                  src={selectedTickets.includes(ticket.id) ? IMAGES.CHECKBOX_CHECKED : IMAGES.CHECKBOX_UNCHECKED}
                  alt={selectedTickets.includes(ticket.id) ? 'Checked' : 'Unchecked'}
                  className={styles.checkboxIcon}
                  onClick={() => handleSelect(ticket.id)}
                />
              </td>
              <td>{ticket.ticketNumber}</td>
              <td className='font-medium dnavy'>{ticket.title}</td>
              <td>
                <div className='flex items-center gap-2'>
                    <div>
                      <img
                      src={ticket.priority === 'HIGH' ? IMAGES.HIGH_PRIORITY : ticket.priority === 'MEDIUM' ? IMAGES.MEDIUM_PRIORITY : IMAGES.LOW_PRIORITY}
                      alt={ticket.priority} className=''/>
                    </div>
                    <div> {ticket.priority}</div>
                </div>
              </td>
              <td>{ticket.assignee}</td>
              <td>{ticket.status}</td>
              <td>{ticket.ticketCategoryName}</td>
              <td>{ticket.dateCreated}</td>
              <td>{ticket.location}</td>
              <td className=''>
                <button className='text-gray-500 hover:text-gray-700' onClick={() => handleTableDropdown(ticket.id)}>⋮</button>
                {openDropdownId === ticket.id && (
                  <div className={`${styles.dropdown} shadow-md absolute right-4 bg-white h-36 w-[110px] z-10`}>
                    {selectedTickets.length <= 1 ? (
                      <Link className='block mb-1  hover:bg-gray-100 p-3 pl-4' to={`/admin/tickets/${ticket.id}`}>View</Link>
                    ) : (
                      <div className='mb-1 hover:bg-gray-100 p-3  pl-4' style={{ color: 'gray', cursor: 'not-allowed' }}>View</div>
                    )}
                    {selectedTickets.length > 1 ? (
                      <div className='mb-1 hover:bg-gray-100 p-3  pl-4' style={{ cursor: 'pointer' }} onClick={handleResolveMultiple}>Resolve All</div>
                    ) : (
                      <div className='mb-1 hover:bg-gray-100 p-3  pl-4' style={{ cursor: 'pointer' }} onClick={() => handleResolve(ticket.id)}>Resolve</div>
                    )}
                    {selectedTickets.length > 1 ? (
                      <div className='mb-1 hover:bg-gray-100 p-3  pl-4' style={{ cursor: 'pointer' }} onClick={handleDeleteMultiple}>Delete All</div>
                    ) : (
                      <div className='mb-1 hover:bg-gray-100 p-3  pl-4' style={{ cursor: 'pointer' }} onClick={() => handleDelete(ticket.id)}>Delete</div>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div className='text-center'>No tickets found</div>
      }
      {/* 
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
      */}
       <ToastContainer />
    </div>
  );
}

export default TicketTable;