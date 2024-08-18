import React from 'react';

import styles from './TicketCountCards.module.css';

import IMAGES from "../../../assets"

export default function TicketCountCards({totalTicketCount, openTicketCount, ongoingTicketCount, resolvedTicketCount}) {
  return (


                <div className='flex flex-wrap justify-between mb-5'>

                          {/* Total Tickets */}
                      <div className={`${styles.ticketCountCard}`} style={{backgroundColor:"#0070FF0D"}}>
                          <div className={`${styles.ticketCountTitleWrapper} flex flex-wrap justify-between`}>
                              <div className={styles.ticketCountCardTitle}>Total Tickets</div>
                              <div className={styles.ticketCountIcon}>
                                <img src={IMAGES.TOTAL_ICON} alt="" />
                              </div>
                          </div>
                         <div className={styles.ticketCount} style={{ color: "#0070FF" }}>{totalTicketCount}</div>
                      </div>


                          {/* Open Tickets */}
                      <div className={`${styles.ticketCountCard}`} style={{backgroundColor:"#FF4C4C0D"}}>
                          <div className={`${styles.ticketCountTitleWrapper} flex flex-wrap justify-between`}>
                              <div className={styles.ticketCountCardTitle}>Open Tickets</div>
                              <div className={styles.ticketCountIcon}>
                                <img src={IMAGES.OPEN_ICON} alt="" />
                              </div>
                          </div>
                         <div className={styles.ticketCount} style={{ color: "#FF4C4C" }}>{openTicketCount}</div>
                      </div>

                        {/* In Progress Tickets */}
                      <div className={`${styles.ticketCountCard}`} style={{backgroundColor:"#FFA5000D"}}>
                          <div className={`${styles.ticketCountTitleWrapper} flex flex-wrap justify-between`}>
                              <div className={styles.ticketCountCardTitle}>In-Progress Tickets</div>
                              <div className={styles.ticketCountIcon}>
                                <img src={IMAGES.INPROGRESS_ICON} alt="" />
                              </div>
                          </div>
                         <div className={styles.ticketCount} style={{ color: "#FFA500" }}>{ongoingTicketCount}</div>
                      </div>


                          {/* Resolved Tickets */}
                      <div className={`${styles.ticketCountCard}`} style={{backgroundColor:"#32CD320D"}}>
                          <div className={`${styles.ticketCountTitleWrapper} flex flex-wrap justify-between`}>
                              <div className={styles.ticketCountCardTitle}>Resolved Tickets</div>
                              <div className={styles.ticketCountIcon}>
                                <img src={IMAGES.RESOLVED_ICON} alt="" />
                              </div>
                          </div>
                         <div className={styles.ticketCount} style={{ color: "#32CD32" }}>{resolvedTicketCount}</div>
                      </div>

                    

                      
                
                </div>
 
   
    // <div className={styles.buttonGroup}>
        
    //   <div className={`${styles.dashboardButton} ${styles.totalTicketsButton}`}  >
    //     <div className={styles.buttonContent}>
    //       <div className={styles.buttonText}>Total Tickets</div>
    //       {/* <img src={folderImg} alt="Total Tickets" className={styles.buttonImg} /> */}
    //     </div>
    //     <div className={styles.ticketCount} style={{ color: "#0070FF" }}>
    //       {totalTicketCount}
    //     </div>
    //   </div>

    //   <div className={`${styles.dashboardButton} ${styles.openTicketsButton}`}>
    //     <div className={styles.buttonContent}>
    //       <div className={styles.buttonText}>Open Tickets</div>
    //       {/* <img src={frameImg} alt="Open Tickets" className={styles.buttonImg} /> */}
    //     </div>
    //     <div className={styles.ticketCount} style={{ color: "#FF4C4C" }}>
    //       {openTicketCount}
    //     </div>
    //   </div>

    //   <div className={`${styles.dashboardButton} ${styles.inProgressTicketsButton}`}>
    //     <div className={styles.buttonContent}>
    //       <div className={styles.buttonText}>In-Progress Tickets</div>
    //          {/* <img src={engineImg} alt="In-Progress Tickets" className={styles.buttonImg} /> */}
    //     </div>
    //     <div className={styles.ticketCount} style={{ color: "#FFA500" }}>
    //       {ongoingTicketCount}
    //     </div>
    //   </div>

    //   <div className={`${styles.dashboardButton} ${styles.resolvedTicketsButton}`} >
    //     <div className={styles.buttonContent}>
    //       <div className={styles.buttonText}>Resolved Tickets</div>
    //       {/* <img src={goodImg} alt="Resolved Tickets" className={styles.buttonImg} /> */}
    //     </div>
    //     <div className={styles.ticketCount} style={{ color: "#32CD32" }}>
    //       {resolvedTicketCount}
    //     </div>
    //   </div>
    // </div>

  )
}
