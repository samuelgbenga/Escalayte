/* eslint-disable no-unused-vars */

import { onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase/firebaseConfig";

// Components
import Navbar from "../../../components/dashboard/navbar/Navbar";
import TicketCountCards from "../../../components/dashboard/ticketCount/TicketCountCards";
import CreateUser from "../../../components/modals/createUser/CreateUser";
import TicketCard from "../../../components/dashboard/ticketCard/TicketCard";
import IMAGES from "../../../assets";
import Notification from "../../../components/modals/notification/Notification";

// import method to request for permission
import { requestPermission } from "../../../firebase/utils/notification";

// utility methods
import {
  fetchLatestThreeOpenTickets,
  fetchLatestThreeResolvedTickets,
  fetchLatestThreeInprogressTickets,
  fetchTicketCount, sortTickets
} from "../../../utils/dashboard-methods/dashboardMethods";

import { formatDate, newFormatDate } from "../../../utils/formatDate";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

import axios from "axios";
import TicketTable from "../../../components/dashboard/ticketTable/TicketTable";
import { useFetchAdmin } from "./useFetchAdmin";
import AdminProfileEdit from "../../../components/modals/profile/admin/AdminProfileEdit";
import ProfileForAdminEdit from "../../../components/modals/profile/admin/ProfileForAdminEdit";

//import ProfileModal from "../../../components/modals/profile/admin/AdminProfileEdit";

//http://localhost:8080/api/v1/admin/get-admin-details
import { BeatLoader, BounceLoader } from "react-spinners";


// import url from .env file
const apiUrl = import.meta.env.VITE_APP_API_URL;
const adminUrl = `${apiUrl}/api/v1/admin/get-admin-details`;

export default function Dashboard() {
  // Token from local storage
  const token = localStorage.getItem("token");


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

  // state values for tickets card
  const [tickets, setTickets] = useState([]);
  const [isTicketCardLoading, setIsTicketCardLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState(null);

  // State for sorting
  const [sort, setSort] = useState("priority");
  const [sortedActivities, setSortedActivities] = useState([]);

  // General loading state
  const [loading, setLoading] = useState(true);

  // edit user or admin
  const [isEditAdmin, setIsEditAdmin] = useState(false);

  const [currentAdmin, setCurrentAdmin] = useState({
    adminId: 1,
    username: "",
    fullName: "",
    email: "",
    pictureUrl: "",
  });

  // values for the style of ticket card titles - New, Ongoing, Resolved
  const defaultStyle = { color: "#BDBDBD" };
  const clickedStyle = {
    backgroundColor: "white",
    color: "#828282",
    borderRadius: "5px",
  };
  const [buttonStyles, setButtonStyles] = useState({
    newTickets: clickedStyle,
    ongoingTickets: defaultStyle,
    resolvedTickets: defaultStyle,
  });

  // Method to fetch the latest 3 Open tickets
  const fetchNewTickets = () => {
    fetchLatestThreeOpenTickets(
      token,
      setTickets,
      setIsTicketCardLoading,
      setTicketsError,
    );
    // Update styles and reset others to default
    setButtonStyles({
      newTickets: clickedStyle,
      ongoingTickets: defaultStyle,
      resolvedTickets: defaultStyle,
    });
  };

  const fetchOngoingTickets = () => {
    fetchLatestThreeInprogressTickets(
      token,
      setTickets,
      setIsTicketCardLoading,
      setTicketsError
    );
    // Update styles and reset others to default
    setButtonStyles({
      newTickets: defaultStyle,
      ongoingTickets: clickedStyle,
      resolvedTickets: defaultStyle,
    });
  };

  const fetchResolvedTickets = () => {
    fetchLatestThreeResolvedTickets(
      token,
      setTickets,
      setIsTicketCardLoading,
      setTicketsError
    );
    // Update styles and reset others to default
    setButtonStyles({
      newTickets: defaultStyle,
      ongoingTickets: defaultStyle,
      resolvedTickets: clickedStyle,
    });
  };

  
  
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

   // Fetching Admin Details
  const { data, isLoading: isAdminLoading, isError: isAdminError } = useFetchAdmin(adminUrl, option);

  //useEffect to load admin info
  useEffect(() => {
    // console.log(isError, STATUS.IN_PROGRESS[1], isLoading);

    const adminDetails = {
      adminId: data?.id,
      username: data?.username,
      fullName: data?.fullName,
      email: data?.email,
      pictureUrl: data?.pictureUrl,
    };

    if (data) {
      setCurrentAdmin({ adminDetails });
      console.log(adminDetails.username, adminDetails.adminId);
    }
    console.log("Admin Data", data);

    // Ensure adminId is defined before calling requestPermission
    if (adminDetails.adminId) {
      requestPermission(adminDetails.adminId);
    }

    
  }, [data]);

  const fetchTickets = async () => {
    try {
      // console.log("admin-token", token);

      const response = await axios.get(
        `${apiUrl}/api/v1/ticket/view-all-tickets`,
        {
          params: { page },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      // console.log("eje", response)

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

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const promises = [
          fetchTickets(),
          fetchLatestThreeOpenTickets(
            token,
            setTickets,
            setIsTicketCardLoading,
            setTicketsError
          ),
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

 
  // Sort activities whenever `sort` or `activities` change
  useEffect(() => {
    setSortedActivities(sortTickets(sort, activities));
  }, [sort, activities]);

  // Handle sort change
  const handleSortChange = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  // Loading state
  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader size={150} color={"#0070FF"} loading={loading} />
      </div>
    );
  }



  const handleIsEditAdminTrue = () => {
    setIsEditAdmin(true);
  };

  const handleIsEditAdminFalse = () => {
    setIsEditAdmin(false);
  };

  onMessage(messaging, (payload) => {
    console.log("incoming msg");
    alert("Ticket created")
    // toast(<Message notification={payload.notification} />);
  });

  return (
    <>
      <div className="pt-5 pb-32 w-11/12 mx-auto">
        {/* Navbar */}

        <Navbar
          onOpen={openModalHandler}
          onClose={closeModalHandler}
          setProfileDropdown={setProfileDropdown}
          profileDropdown={profileDropdown}
        />
        






        {/* {isModalOpen1 && !isEditAdmin && (
          <AdminProfileEdit onClose={handleOpenModal1} />
        )}

    

        {isModalOpen1 && isEditAdmin && (
          <ProfileForAdminEdit onClose={handleOpenModal1} />
        )}

        {profileDropdown && (
          <DropDown
            handleOpenModal1={handleOpenModal1}
            isEditAdminTrue={handleIsEditAdminTrue}
            isEditAdminFalse={handleIsEditAdminFalse}
          />
        )} */}

        {/* Sort and Add user row */}
        <div className="flex flex-wrap mt-10 mb-10 justify-end">
          <div>
            <div className="text-gray-500">Sort by</div>
            <div className="flex flex-wrap gap-4">
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
                <div>
                    <button
                    onClick={() => openModalHandler("createUser")}
                    className="bg-blue-500 text-white px-4 text-sm h-9 mr-20 "
                  >
                    Add New User
                  </button>
                </div>
              
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

        {/* Ticket Card title widget */}

        <div
          style={{ backgroundColor: "#F2F2F2" }}
          className="flex flex-wrap mb-5 px-3 py-2 border-radius"
        >
          <div className="flex flex-wrap w-full lg:w-8/12 gap-x-9 justify-between lg:justify-start">
            <button
              className={`focus:outline-none border-none sm_text px-4`}
              style={buttonStyles.newTickets}
              onClick={fetchNewTickets}
            >
              New Tickets
            </button>
            <button
              className={`focus:outline-none border-none sm_text px-4`}
              style={buttonStyles.ongoingTickets}
              onClick={fetchOngoingTickets}
            >
              Ongoing Tickets
            </button>
            <button
              className={`focus:outline-none border-none sm_text px-4`}
              style={buttonStyles.resolvedTickets}
              onClick={fetchResolvedTickets}
            >
              Resolved Tickets
            </button>
          </div>

          <div className="w-full lg:w-4/12 hidden lg:flex gap-x-6">
            <button
              className="ml-auto bg-white px-2 sm_text rounded-md"
              style={{ color: "#828282", borderRadius: "5px" }}
            >
              Today
            </button>
            <button>
              <img src={IMAGES.LEFT_ARROW} alt="" />
            </button>
            <button>
              <img src={IMAGES.RIGHT_ARROW} alt="" />
            </button>
          </div>
        </div>
        {/* Ticket Cards */}
        <div className={`${tickets.length > 2 ? "justify-between" : "justify-start gap-10"} flex flex-wrap mb-8`}>
          {
            
          isTicketCardLoading ? (
            <div className="flex min-w-full justify-center items-center transition-opacity duration-500 ease-in-out">
              <BeatLoader size={15} color={"#0070FF"} loading={isTicketCardLoading} />
            </div>
          ) :
          tickets.map((ticket) => {
            return <TicketCard 
            
              key={ticket.id} 
              ticket={ticket} 
              button={true} 
              
              // Fetch Tickets
              fetchTickets={fetchTickets}
              setActivities={setActivities}
              setHasMore={setHasMore}
              page={page}

              // Fetch Latest Three Open/Inprogress/Resolved Tickets
              fetchLatestThreeOpenTickets={fetchLatestThreeOpenTickets}
              fetchLatestThreeInprogressTickets={fetchLatestThreeInprogressTickets}
              fetchLatestThreeResolvedTickets={fetchLatestThreeResolvedTickets}
              setTickets={setTickets}
              setIsTicketCardLoading={setIsTicketCardLoading}
              setTicketsError={setTicketsError}

              // Fetch Ticket Count
              fetchTicketCount={fetchTicketCount}
              setTicketTotalCount={setTicketTotalCount}
              setOpenTicketCount={setOpenTicketCount}
              setResolvedTicketCount={setResolvedTicketCount}
              setOngoingTicketCount={setOngoingTicketCount}
            />;
          })
          
          }
        </div>
       

        {/* Ticket Table */}
        <TicketTable
          activities={sortedActivities}
          setActivities={setActivities}
          setPage={setPage}
          page={page}

          // Fetch Tickets
          fetchTickets={fetchTickets}
          setHasMore={setHasMore}

          // Fetch Latest Three Open/Inprogress/Resolved Tickets
          fetchLatestThreeOpenTickets={fetchLatestThreeOpenTickets}
          fetchLatestThreeInprogressTickets={fetchLatestThreeInprogressTickets}
          fetchLatestThreeResolvedTickets={fetchLatestThreeResolvedTickets}
          setTickets={setTickets}
          setIsTicketCardLoading={setIsTicketCardLoading}
          setTicketsError={setTicketsError}

          // Fetch Ticket Count
          fetchTicketCount={fetchTicketCount}
          setTicketTotalCount={setTicketTotalCount}
          setOpenTicketCount={setOpenTicketCount}
          setResolvedTicketCount={setResolvedTicketCount}
          setOngoingTicketCount={setOngoingTicketCount}
        />

        {/* Modals */}

        <CreateUser
          isOpen={openModal === "createUser"}
          onClose={closeModalHandler}
          // closeOnOutsideClick={true}
        />

        {/* Profile Dropdown 
       {
        profileDropdown && 
         <div className='position-absolute sm_text bg-white border w-40'>
            <div className='mb-4'>
              <div>Notification</div>
            </div>
            <div className='mb-4' style={{color:"#1F2937"}}>Profile</div>
            <div className='mb-4' style={{color:"#1F2937"}} >Logout</div>
         </div>
      }*/}
        <Notification 
            adminId={data && data.id}
            isOpen={openModal === "notification"}
            onClose={closeModalHandler}
        />



        {/* Profile Dropdown */}
       
      </div>
    </>
  );
}

const DropDown = ({ handleOpenModal1, isEditAdminFalse, isEditAdminTrue }) => {
  const handleDisplayEdit = () => {
    handleOpenModal1();
    isEditAdminTrue();
  };

  const handleDisplayEditFalse = () => {
    handleOpenModal1();
    isEditAdminFalse();
  };

  return (
    <>
      <div
        className="py-1 w-[150px] fixed right-40 bg-white border"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdownButton"
      >
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => handleDisplayEdit()}
        >
          Edit Profile
        </button>
        <div className="border-t border-gray-200"></div>
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => handleDisplayEditFalse()}
        >
          Edit Employee Profile
        </button>
      </div>
    </>
  );
};
