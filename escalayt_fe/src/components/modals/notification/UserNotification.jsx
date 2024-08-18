import React, { useEffect, useState } from "react";
import { useFetchTicket } from "./useFetchTicket";
import NotificationIcon from "../../../assets/NotificationIcon";
import RateTicket from "../rateTicket/RateTicket";

const token = localStorage.getItem("token");

//second parameter for setting header
const option = {
  // method
  method: "GET",
  // header
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const URLS = {
  TICKETS: "http://localhost:8080/api/v1/ticket/get-ticket/created-by",
};

// const initiall ticket object
const INTIAL_TICKET_OBJ = {
  ticketId: 0,
  ticketStatus: "",
  ticketTitle: "",
  minutes: 0,
  username: "",
  pictureUrl: "",
  assigneeId: "",
  assigneeFullName: "",
  assigneeUsername: "",
  assigneePictureUrl: "",
};

// progress state constant
const STATUS = {
  OPEN: " has been opened! ",
  IN_PROGRESS: [" has been assigned to ", " to In-Progress."],
  RESOLVED: " has been resolved!",
};

const UserNotification = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  const [url, setUrl] = useState(`${URLS.TICKETS}`);

  const { data, isLoading, isError } = useFetchTicket(url, option);

  const [ticketList, setTicketList] = useState([INTIAL_TICKET_OBJ]);

  const [ticketId, setTicketId] = useState(0);

  // open ratating ticket  modal
  const [ratingIsOpen, setRatingIsOpen] = useState(false);

  const handleRatingModal = (id) => {
    setRatingIsOpen(!ratingIsOpen);

    setTicketId(id);

    console.log(id);
  };

  useEffect(() => {
    // console.log(isError, STATUS.IN_PROGRESS[1], isLoading);

    if (data) {
      setTicketList(
        data.map((ticket) => {
          return {
            ticketId: ticket.id,
            ticketStatus: ticket.status,
            ticketTitle: ticket.title,
            minutes: ticket.minutesDifference,
            username: ticket.resolvedByAdminDto
              ? ticket.resolvedByAdminDto.username
              : ticket.resolvedByUserDto
              ? ticket.resolvedByUserDto.username
              : ticket.assigneeDto
              ? ticket.assigneeDto.username
              : ticket.createdByAdmin
              ? ticket.createdByAdmin.username
              : ticket.createdByUserDto?.username,

            pictureUrl: ticket.resolvedByAdminDto
              ? ticket.resolvedByAdminDto.pictureUrl
              : ticket.resolvedByUserDto
              ? ticket.resolvedByUserDto.pictureUrl
              : ticket.assigneeDto
              ? ticket.assigneeDto.pictureUrl
              : ticket.createdByAdmin
              ? ticket.createdByAdmin.pictureUrl
              : ticket.createdByUserDto?.pictureUrl,
          };
        })
      );
    }

    // console.log(data);
  }, [data]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div
        className={` ${"bg-white"} text-sm  w-[448px]  rounded-lg shadow-custom p-6 fixed right-10 overflow-y-auto z-20 `}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="w-[400px]  mb-[20px] flex flex-col items-center justify-center">
              <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
                <div className="rounded-lg custom-shadow p-4 bg-white">
                  <NotificationIcon
                    className="w-12 h-12 rounded-lg border p-3"
                    style={{ borderColor: "#EAECF0" }}
                  />
                </div>

                <button className="text-gray-600" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex w-[352px] h-[28px]">
                <p className="text-lg font-semibold leading-7 text-left">
                  Notification
                </p>
              </div>
            </div>

            <ul>
              {ticketList.map((ticket) =>
                !data ? (
                  <li>No notification</li>
                ) : (
                  <li
                    key={ticket.ticketId}
                    className="flex items-start justify-between p-4 gap-2"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={
                          ticket.pictureUrl
                            ? ticket.pictureUrl
                            : "https://avatar.iran.liara.run/public/boy?username=Ash"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="w-300">
                          {" "}
                          {`Your Ticket ticket #00${ticket.ticketId} - ${ticket.ticketTitle}`}
                          <CustomPTag status={ticket.ticketStatus} />
                          {ticket.ticketStatus == "IN_PROGRESS" && (
                            <span>{ticket.username}!</span>
                          )}
                        </div>
                        {ticket.ticketStatus == "RESOLVED" && (
                          <RateTicketBtn
                            handleRatingModal={() =>
                              handleRatingModal(ticket.ticketId)
                            }
                          />
                        )}
                      </div>
                    </div>

                    <div className="text-gray-300 ">
                      {formatTime(ticket.minutes)}
                    </div>
                  </li>
                )
              )}
            </ul>
            {ratingIsOpen && (
              <RateTicket ticketId={ticketId} onClose={handleRatingModal} />
            )}
          </div>
        )}
      </div>
      {/* rateicket modal */}
    </>
  );
};

export default UserNotification;

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const CustomPTag = ({ status }) => {
  let displayStatus = "";

  switch (status) {
    case "OPEN":
      displayStatus = STATUS.OPEN;
      break;
    case "IN_PROGRESS":
      displayStatus = STATUS.IN_PROGRESS[0];
      break;
    case "RESOLVED":
      displayStatus = STATUS.RESOLVED;
      break;
    default:
      displayStatus = "unknown status"; // Optional: Handle unknown status
  }

  return <>{displayStatus}</>;
};

// formate the minute
const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return `${hours} hr${hours > 1 ? "s" : ""}${
      remainingMinutes
        ? ` ${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`
        : ""
    }`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""}${
      remainingHours
        ? ` ${remainingHours} hr${remainingHours > 1 ? "s" : ""}`
        : ""
    }`;
  }

  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? "s" : ""}${
      remainingDays
        ? ` ${remainingDays} day${remainingDays > 1 ? "s" : ""}`
        : ""
    }`;
  }

  const months = Math.floor(weeks / 4);
  const remainingWeeks = weeks % 4;

  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""}${
      remainingWeeks
        ? ` ${remainingWeeks} week${remainingWeeks > 1 ? "s" : ""}`
        : ""
    }`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return `${years} year${years > 1 ? "s" : ""}${
    remainingMonths
      ? ` ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
      : ""
  }`;
};

// button for rating
function RateTicketBtn({ handleRatingModal }) {
  return (
    <>
      <div className="bg-custom-blue p-4 h-[44px] w-[240px] flex items-center justify-center mt-2 mb-2">
        <button
          onClick={handleRatingModal}
          className="text-white text-md-semibold"
        >
          Rate ticket resolution
        </button>
      </div>
    </>
  );
}
/*
using tailwind css:
style this for me:
its a notification style...
make it one one column with multiple rows.
each contains:
image(avater the creator of the image) followed The the name of the person:
and then the custom dynamic text that follows for each rows.
The image: should be a small circle that aligns with the text that follows it:
then the name should be bold
*/
