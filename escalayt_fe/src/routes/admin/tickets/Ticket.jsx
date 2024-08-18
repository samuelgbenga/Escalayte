import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateCategory from "../../../components/modals/createCategory/CreateTicketCategory";
import CreateDepartment from "../../../components/modals/createDepartment/CreateDepartment";
import { formatDate, newFormatDate } from "../../../utils/formatDate";
import { useFetchAdmin } from "../dashboard/useFetchAdmin";

import styles from  "./ticket.module.css";

import Navbar from "../../../components/dashboard/navbar/Navbar";
import TicketTable from "../../../components/dashboard/ticketTable/TicketTable";
import Notification from "../../../components/modals/notification/Notification";

// import url from .env file
const apiUrl = import.meta.env.VITE_APP_API_URL;
const adminUrl = `${apiUrl}/api/v1/admin/get-admin-details`;

export default function Ticket() {
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentAdmin, setCurrentAdmin] = useState({
    adminId: 1,
    username: "",
    fullName: "",
    email: "",
  });

  

  // State values for profile dropdown
  const [profileDropdown, setProfileDropdown] = useState(false);

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
    categoryId: [],
  });
  const [sort, setSort] = useState("priority");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(14); // Number of items per page

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
    // console.log("Admin Data",data);

    // Ensure adminId is defined before calling requestPermission
    // if (adminDetails.adminId) {
    //   requestPermission(adminDetails.adminId);
    // }

    
  }, [data]);

  useEffect(() => {
    fetchFilteredTickets();
  }, [filters, page]);

  useEffect(() => {
    setSortedTickets(sortTickets(tickets));
    console.log(tickets);
  }, [sort, tickets]);

  const fetchFilteredTickets = async () => {
    const apiGeneralUrl = apiUrl + "/api/v1/ticket/filter-new";

    // Construct query parameters
    const params = new URLSearchParams();
    params.append("page", page);

    // Handle multiple values for filters
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((value) => params.append(key, value));
    });

    try {
      const response = await axios.get(apiGeneralUrl, {
        params: params,
        headers: {
          "Content-Type": "application/json",
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
      console.error("Error fetching tickets", error);
    }
  };

  const sortTickets = (tickets) => {
    const priorityOrder = ["HIGH", "MEDIUM", "LOW"];
    const statusOrder = ["OPEN", "IN_PROGRESS", "RESOLVED"];

    // Create a new array from tickets before sorting
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
        return a.assigneeFullName.localeCompare(b.assigneeFullName);
      }
      if (sort === "categoryId") {
        return a.ticketCategoryName.localeCompare(b.ticketCategoryName);
      }
      return 0;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter((item) => item !== value),
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
      <div className="w-11/12 mx-auto">
        {/* Navbar */}
      <Navbar
          onOpen={openModalHandler}
          onClose={closeModalHandler}
          setProfileDropdown={setProfileDropdown}
          profileDropdown={profileDropdown}
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
                  <div className="h-[24px] flex items-center mb-8 ">
                    <span className="text-[20px] font-medium leading-[24px] text-left">
                      Tickets ({sortedTickets.length})
                    </span>
                  </div>
                  <div className=" flex gap-[22px] mb-8 ">
                    <div className="h-[44px] w-[175px] bg-[#0070FF] flex items-center justify-center px-[24px] py-[10px]">
                      <button
                        onClick={() => openModalHandler("createCategory")}
                        className="text-[16px] font-medium leading-[24px] text-left text-white"
                      >
                        Create Category
                      </button>
                    </div>
                    <div className="h-[44px] w-[200px] bg-[#0070FF] flex items-center justify-center px-[24px] py-[10px]">
                      <button
                        onClick={() => openModalHandler("createDepartment")}
                        className="text-[16px] font-medium leading-[24px] text-left text-white"
                      >
                        Create Department
                      </button>
                    </div>
                  </div>
    
                  <div className="h-[auto] ">
                  <TicketTable activities={sortedTickets} setActivities = {setTickets} setPage = {setPage} page={page}/>
              {/*
                    <div className="pagination">
                      <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                        Previous
                      </button>
                      <span>Page {page + 1} of {totalPages}</span>
                      <button onClick={() => handlePageChange(page + 1)} disabled={page + 1 >= totalPages}>
                        Next
                      </button>
                    </div>
                    */}
                  </div>
        </div>

        {/* Modals */}

        <CreateCategory
          isOpen={openModal === "createCategory"}
          onClose={closeModalHandler}
        />

        <CreateDepartment
          isOpen={openModal === "createDepartment"}
          onClose={closeModalHandler}
          closeOnOutsideClick={true}
        />

        <Notification 
            adminId={data && data.id}
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
      </div>
    </>
  );
}
