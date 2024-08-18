/* eslint-disable no-unused-vars */

import { onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase/firebaseConfig";

// Components
import Navbar from "../../../components/dashboard/navbar/Navbar";
import UserNavbar from "../../../components/dashboard/user-navbar/UserNavbar";
import TicketCountCards from "../../../components/dashboard/ticketCount/TicketCountCards";
import CreateTicket from "../../../components/modals/createTicket/CreateTicket";
import IMAGES from "../../../assets";

// import method to request for permission
import { requestPermission } from "../../../firebase/utils/notification";


// utility methods
import { fetchTicketCount, fetchTickets } from "../../../utils/dashboard-methods/dashboardMethods";
import { formatDate } from "../../../utils/formatDate";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

import axios from "axios";
import TicketTable from "../../../components/dashboard/ticketTable/TicketTable";
import { useFetchUser } from "./useFetchUser";
import UserNotification from "../../../components/modals/notification/UserNotification";
import ProfileModal from "../../../components/modals/profile/user/ProfileModal";





 // import url from .env file
 const apiUrl = import.meta.env.VITE_APP_API_URL;

 const userUrl = `${apiUrl}/api/v1/users/get-user-detail`;


export default function Dashboard() {
  const token = localStorage.getItem("token");

  // samuel modal for notification
  const [isModalOpen, setIsModalOpen] = useState(false);

    // second parameter for setting header
  const option = {
    // method
    method: "GET",
    // header
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // State values for profile dropdown
  const [profileDropdown, setProfileDropdown] = useState(false);

  //State values for ticket count
  const [totalTicketCount, setTicketTotalCount] = useState(0);
  const [openTicketCount, setOpenTicketCount] = useState(0);
  const [resolvedTicketCount, setResolvedTicketCount] = useState(0);
  const [ongoingTicketCount, setOngoingTicketCount] = useState(0);
  const navigate = useNavigate();

  // State for Recent Activities - Tickets
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // State for sorting
  const [sort, setSort] = useState("priority");
  const [sortedActivities, setSortedActivities] = useState([]);

    // Fetching Admin Details
  const { data, isLoading, isError } = useFetchUser(userUrl, option);

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

    //useEffect to load admin info
    useEffect(() => {
  
      const userDetails = {
        userId: data?.id,
        username: data?.username,
        fullName: data?.fullName,
        email: data?.email,
        pictureUrl: data?.pictureUrl,
      };
     
      // Ensure userId is defined before calling requestPermission
      if (userDetails.userId) {
        requestPermission(userDetails.userId);
      }
  
      
    }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const promises = [
          fetchTickets(token, setActivities, setHasMore, page),
          fetchTicketCount(
            token,
            setTicketTotalCount,
            setOpenTicketCount,
            setResolvedTicketCount,
            setOngoingTicketCount
          ),
        ];

        await Promise.all(promises);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Sorting function
  const sortTickets = (tickets) => {
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

  // Sort activities whenever `sort` or `activities` change
  useEffect(() => {
    setSortedActivities(sortTickets(activities));
  }, [sort, activities]);

  // Handle sort change
  const handleSortChange = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  if (loading) {
    return <div>Loading...</div>; // Add your loading spinner here if you have one
  }

  onMessage(messaging, (payload) => {
    alert("Ticket assigned")
    // toast(<Message notification={payload.notification} />);
  });



  return (
    <div className="pt-5 pb-32 w-11/12 mx-auto">
      {/* Navbar */}

      {/* {isModalOpen1 && <ProfileModal onClose={handleOpenModal1} />} */}

      <ProfileModal 
          onOpen={openModalHandler}
          onClose={closeModalHandler}

          />

      {/* Sort and Add user row */}
      <UserNavbar 
            onOpen={openModalHandler}
            setProfileDropdown={setProfileDropdown}
            profileDropdown={profileDropdown}
          />

      {/* Sort row */}
      <div className="flex flex-wrap mt-10 mb-20 justify-end">
          <div>
              <div>Sort by</div>
              <div>
                  <select
                    className="px-9 py-1 bg-white border border-blue-500 h-9"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <option value="priority">Priority </option>
                    <option value="status">Status </option>
                    <option value="assigneeId">Assignee </option>
                    <option value="categoryId">Category </option>
                  </select>
                </div>
          </div>
        </div>

      {/* Ticket Count Cards */}
      <TicketCountCards
        totalTicketCount={totalTicketCount}
        openTicketCount={openTicketCount}
        resolvedTicketCount={resolvedTicketCount}
        ongoingTicketCount={ongoingTicketCount}
      />

      {/* Ticket Table */}
      <TicketTable
        activities={sortedActivities}
        setActivities={setActivities}
        setPage={setPage}
        page={page}
      />

  
      <UserNotification 
        isOpen={openModal === "notification"}
        onClose={closeModalHandler}
       />

      {/* Profile Dropdown */}
      {profileDropdown && (
        <div className="position-absolute sm_text bg-white border w-40">
          <div className="mb-4">
            <div>Notification</div>
          </div>
          <div className="mb-4" style={{ color: "#1F2937" }}>
            Profile
          </div>
          <div className="mb-4" style={{ color: "#1F2937" }}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
