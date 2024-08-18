/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import IMAGES from "../../../assets"

import Navbar from "../../../components/dashboard/navbar/Navbar";
import TicketDetails from "../../../components/dashboard/ticketDetails/TicketDetails";
import { Comment } from '../../../components/dashboard/comment/Comment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import url from .env file
const base = import.meta.env.VITE_APP_API_URL;

export default function TicketPreview() {
  const token = localStorage.getItem("token");

  const { id } = useParams();

  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const apiUrl = `${base}/api/v1/ticket/preview-ticket/${id}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTicket(response.data);
      console.log("Ticket fetched successfully:", response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching ticket");
      setLoading(false);
      console.error("Error fetching ticket", error);
    }
  };

  const handleResolve = async (ticketId) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  
    try {
      const response = await axios.post(`${base}/api/v1/ticket/${ticketId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Ticket resolved successfully:', response.data);
      toast.success('Ticket resolved successfully');
      fetchTicket();
      // fetchDatas();
    } catch (error) {
      console.error('Error resolving ticket:', error.response ? error.response.data : error.message);
      toast.error('Error resolving ticket');
      // Handle the error scenario, e.g., showing an error message to the user
    }
  };


  return (
    <div className="w-11/12 mx-auto ">
      <Navbar />

      {/* Title and resolution */}
      <div className="flex flex-wrap justify-between mt-5 mb-8">

        <div className="flex flex-wrap">
          <div><Link to="/admin/dashboard"><img src={IMAGES.BACK_ARROW} alt="" /></Link></div>
          <div>Ticket: #{ticket.id} - {ticket.title}</div>
        </div>

        <div>
         {
          ticket.status === "RESOLVED" ? (<>Ticket is Resolved</>) :
          <button type="button" onClick={()=>{handleResolve(ticket.id)}} className="p_btn px-3 py-2">Resolve</button>
         }
        </div>
        
      </div>

      <TicketDetails ticket={ticket} />
      <Comment ticketId={id} />

      <ToastContainer />
    </div>
  );
}
