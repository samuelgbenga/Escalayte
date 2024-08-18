import React, {useState, useEffect}  from'react';
import AssignTicket from '../../modals/assignTicket/AssignTicket';
import styles from './TicketCard.module.css';
import { formatDate, newFormatDate } from '../../../utils/formatDate';

const TicketCard = ({
  ticket, 
  button, 
  fetchTickets, 
  setActivities, 
  setHasMore, 
  page,
  fetchLatestThreeOpenTickets, 
  fetchLatestThreeInprogressTickets, 
  fetchLatestThreeResolvedTickets, 
  token, 
  setTickets, 
  setIsTicketCardLoading, 
  setTicketsError,
  fetchTicketCount, 
  setTicketTotalCount, 
  setOpenTicketCount, 
  setResolvedTicketCount, 
  setOngoingTicketCount
}) => {

  // console.log("ticket card", ticket);


  const [isAssignTicketModalOpen, setIsAssignTicketModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect after component mounts
    setIsVisible(true);
  }, []);


  const handleAssignTicketOpenModal = () => {
    setIsAssignTicketModalOpen(true);
  };

  const handleAssignTicketCloseModal = () => {
    setIsAssignTicketModalOpen(false);
  };

  return (
    <div className={`bg-gray-100 shadow-md h-[220px] flex items-center w-[30%]`}>
      <div className=' w-full p-6'>
      <div className="flex flex-wrap justify-between items-center mb-2">
        <span className="font-medium sm_text">Ticket #{ticket.id}</span>
        <span className="sm_text" style={{color:'#828282'}}>{newFormatDate(ticket.createdAt)}</span>
      </div>
      {
          ticket.status === "OPEN" ? (
            <>
                <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
                <p className="sm_text mb-4 text-center">
                  "{ticket.createdByAdmin ? ticket.createdByAdmin : ticket.createdByUser} created a new ticket #{ticket.id} - {ticket.title}."
                </p>
                <div className='flex justify-center '>
                    <button style = {{color:"#344054"}} className="bg-white w-full hover:opacity-50 no_text font-semibold py-2 rounded"
                    onClick={handleAssignTicketOpenModal}
                    >
                        Assign
                    </button>
                </div>
            </>
          ) : ticket.status === "IN_PROGRESS" ?

          (
            <>
                <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
                <p className="sm_text mb-4 text-center">
                  "{ticket.assignedByAdmin ? ticket.assignedByAdmin : ticket.assignedByAdmin} updated ticket #{ticket.id} - {ticket.title} to In-progress."
                </p>
            </>
          ) :

          (
            <>
                <h2 className="no_text font-medium mb-2 text-center">{ticket.title}</h2>
                <p className="sm_text mb-4 text-center">
                  "{ticket.resolvedByAdmin ? ticket.resolvedByAdmin : ticket.resolvedByUser} resolved ticket #{ticket.id} - {ticket.title}."
                </p>
                <div className='flex justify-center border'>
                    <div style = {{color:"#344054"}} className="bg-white w-full text-center hover:bg-gray-100 no_text font-semibold py-2 rounded">
                        Completed
                    </div>
                </div>
            </>
          )
        
      }
      </div>

     {isAssignTicketModalOpen && (
          <AssignTicket
          ticket={ticket}
          fetchTickets={fetchTickets}
          setActivities={setActivities}
          setHasMore={setHasMore}
          page={page}
          fetchLatestThreeOpenTickets={fetchLatestThreeOpenTickets}
          fetchLatestThreeInprogressTickets={fetchLatestThreeInprogressTickets}
          fetchLatestThreeResolvedTickets={fetchLatestThreeResolvedTickets}
          setTickets={setTickets}
          setIsTicketCardLoading={setIsTicketCardLoading}
          setTicketsError={setTicketsError}
          fetchTicketCount={fetchTicketCount}
          setTicketTotalCount={setTicketTotalCount}
          setOpenTicketCount={setOpenTicketCount}
          setResolvedTicketCount={setResolvedTicketCount}
          setOngoingTicketCount={setOngoingTicketCount}
          onAssignTicketClose={handleAssignTicketCloseModal} 
          ticketId={ticket.id} />
        )}
    </div>
  );
}

export default TicketCard;

/*

*/