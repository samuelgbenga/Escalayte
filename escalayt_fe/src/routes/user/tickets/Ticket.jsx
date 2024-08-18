import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from "../../admin/tickets/ticket.module.css";


import "./ticket.css";

import Navbar from '../../../components/dashboard/navbar/Navbar';
import UserNavbar from '../../../components/dashboard/user-navbar/UserNavbar';
import UserNotification from '../../../components/modals/notification/UserNotification';
import TicketTable from '../../../components/dashboard/ticketTable/TicketTable';
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";

import { fetchFilteredTickets } from '../../../utils/dashboard-methods/dashboardMethods';

// import url from .env file
const base = import.meta.env.VITE_APP_API_URL;

export default function Ticket() {

    const token = localStorage.getItem("token");


    // State values for profile dropdown
    const [profileDropdown, setProfileDropdown] = useState(false);

   
    // General loading state
    const [loading, setLoading] = useState(true);

    // General Modal State
    const [openModal, setOpenModal] = useState(null);

    // General Modal Open Handler
    const openModalHandler = (modalName) => {
      setOpenModal(modalName);
    };

     // General Modal Close Handler
    const closeModalHandler = () => {
      setOpenModal(null);
    };


  const [tickets, setTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [filters, setFilters] = useState({
    priority: [],
    status: [],
    assigneeId: [],
    categoryId: []
  });
  const [sort, setSort] = useState('priority');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(14); // Number of items per page

  const formatDate = (dateString) => {

    const date = new Date(dateString);
    const today = new Date();
    const timeDiff = today - date;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "1 day ago";
    } else {
      return `${daysDiff} days ago`;
    }
  };


  useEffect(() => {
    fetchFilteredTickets(token, page, setTickets, setTotalPages, filters);
    
  }, [filters, page]);

  useEffect(() => {
    setSortedTickets(sortTickets(tickets));
    console.log(tickets);
  }, [sort, tickets]);



  const sortTickets = (tickets) => {
    const priorityOrder = ['HIGH', 'MEDIUM', 'LOW'];
    const statusOrder = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
    
      
  // Create a new array from tickets before sorting
  return [...tickets].sort((a, b) => {
    if (sort === 'priority') {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    }
    if (sort === 'status') {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    }
    if (sort === 'assigneeId') {
      return a.assigneeFullName.localeCompare(b.assigneeFullName);
    }
    if (sort === 'categoryId') {
      return a.ticketCategoryName.localeCompare(b.ticketCategoryName);
    }
    return 0;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter((item) => item !== value)
      }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (

    <>
    {/* Navbar */}
    {/* <Navbar setProfileDropdown={setProfileDropdown} profileDropdown={profileDropdown}/> */}

       <div className='w-11/12 mx-auto'>
          <UserNavbar 
                  onOpen={openModalHandler}
                  setProfileDropdown={setProfileDropdown}
                  profileDropdown={profileDropdown}
                />

            <UserNotification 
              isOpen={openModal === "notification"}
              onClose={closeModalHandler}
            />

          <div className="flex flex-wrap mt-8">
              <div className="pl-4 bg-[#F2F2F280] w-2/12 pt-4">
                      {/* Render filter UI here */}
                        <div className="font-medium text-[18px] mb-4">Filters</div>
                        {/* Sort By */}
                        <div className={`${styles.filter_component}`}>
                          <div>Sort By</div>
                          <select value={sort} onChange={handleSortChange}>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                            <option value="assigneeId">Assignee</option>
                            <option value="categoryId">Category</option>
                          </select>
                        </div>

                        {/* Priority */}
                        <div className={`${styles.filter_component}`}>
                          <div className={`${styles.filter_component_title}`}>Priority</div>
                          <label>
                            <input
                              type="checkbox"
                              name="priority"
                              value="HIGH"
                              onChange={handleFilterChange}
                            />
                            High
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="priority"
                              value="MEDIUM"
                              onChange={handleFilterChange}
                            />
                            Medium
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="priority"
                              value="LOW"
                              onChange={handleFilterChange}
                            />
                            Low
                          </label>
                        </div>

                        {/* Status */}
                        <div className={`${styles.filter_component}`}>
                          <div className={`${styles.filter_component_title}`}>Status</div>
                          <label>
                            <input
                              type="checkbox"
                              name="status"
                              value="OPEN"
                              onChange={handleFilterChange}
                            />
                            Open
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="status"
                              value="IN_PROGRESS"
                              onChange={handleFilterChange}
                            />
                            In Progress
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="status"
                              value="RESOLVED"
                              onChange={handleFilterChange}
                            />
                            Resolved
                          </label>
                        </div>

                        {/* Assignee */}
                        <div className={`${styles.filter_component}`}>
                          <div className={`${styles.filter_component_title}`}>Assignee</div>
                          {/* Replace with dynamic assignees */}
                          <label>
                            <input
                              type="checkbox"
                              name="assigneeId"
                              value="1"
                              onChange={handleFilterChange}
                            />
                            Abdul Ahmed
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="assigneeId"
                              value="2"
                              onChange={handleFilterChange}
                            />
                            Tayo Ade
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="assigneeId"
                              value="3"
                              onChange={handleFilterChange}
                            />
                            Chizzy Jack
                          </label>
                        </div>

                        {/* Category */}
                        <div className={`${styles.filter_component}`}>
                          <div className={`${styles.filter_component_title}`}>Category</div>
                          <label>
                            <input
                              type="checkbox"
                              name="categoryId"
                              value="1"
                              onChange={handleFilterChange}
                            />
                            Plumbing
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="categoryId"
                              value="2"
                              onChange={handleFilterChange}
                            />
                            Electrical
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="categoryId"
                              value="3"
                              onChange={handleFilterChange}
                            />
                            HVAC
                          </label>
                        </div>
              </div>

                <div className="pl-8 w-10/12">
                        <div className="h-[24px] flex items-center mb-6">
                          <span className="text-[20px] font-medium leading-[24px] text-left">
                            Tickets ({sortedTickets.length})
                          </span>
                        </div>
                        <div className=" flex gap-[22px] mb-6">
                        <button onClick={() => openModalHandler('createTicket')} className="bg-blue-500 text-white px-4 py-2 rounded">
                              Create Ticket
                        </button>
                          
                        </div>
          
                        <div className="h-[auto] ">
                        <TicketTable activities={sortedTickets} setActivities = {setTickets} setPage = {setPage} page={page}/>
                  
                        
                        </div>
                </div>

              {/* Modals */}

              <CreateTicket
                isOpen={openModal === 'createTicket'}
                onClose={closeModalHandler}
                // closeOnOutsideClick={true}
              />


              <CreateTicket
                isOpen={openModal === "createTicket"}
                onClose={closeModalHandler}
                // Fetch filtered ticket values
                  fetchFilteredTickets={fetchFilteredTickets}
                  token={token}
                  page={page}
                  setTickets={setTickets}
                  setTotalPages={setTotalPages}
                  filters={filters}
              />

                {/* Profile Dropdown */}
            {
              profileDropdown && 
              <div className='position-absolute sm_text bg-white border w-40'>
                  <div className='mb-4'>
                    <div>Notification</div>
                  </div>
                  <div className='mb-4' style={{color:"#1F2937"}}>Profile</div>
                  <div className='mb-4' style={{color:"#1F2937"}} >Logout</div>
              </div>
            }
          </div>
    
       </div>
    </>
  );
}


