/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PdfIcon from "./../../../assets/Pdf";
import DownloadIcon from "./../../../assets/DownloadIcon";
import TrashIcon from "./../../../assets/TrashIcon";
import { BeatLoader, BounceLoader } from "react-spinners";

export default function TicketDetails({ ticket }) {
  console.log("ticket here", ticket);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ticket.fileUrl; // Replace with the URL of the file on Cloudinary
    link.target = '_blank'; // Use the file title for the download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return `300kb. ${new Date(dateString).toLocaleDateString(undefined, options)}`;
  };
  
  const formattedDate = formatDate(ticket.createdAt)

  return (
          <>
              {

                Object.keys(ticket).length > 0  ?
                <div className=" w-10/12 mx-auto">
                  <div className="flex flex-wrap justify-between no_text mb-4">
                      {/* User Details */}
                      <div className="w-full lg:w-6/12">
                        <div className="font-medium mb-4">User Details</div>
                        <div className="flex flex-wrap  gap-6">
                          {/* Details */}
                          <div style={{ color: "#828282" }}>
                            <div>Name</div>
                            <div>Email</div>
                            <div>Role</div>
                            <div>Department</div>
                            <div>Phone Number</div>
                          </div>
                          {/* Values */}
                          <div>
                          {
                            ticket.createdByUser && 
                              <div style={{ color: "#828282" }}>
                                <div>{ticket.createdByUser.fullName || "null"}</div>
                                <div>{ticket.createdByUser.email || "null"}</div>
                                <div>{ticket.createdByUser.jobTitle || "null"}</div>
                                <div>{ticket.createdByUser.department}</div>
                                <div>{ticket.createdByUser.phoneNumber}</div>
                              </div>

                          }
                          </div>
                        </div>
                      </div>

                      {/* Ticket Details */}
                      <div className="w-full lg:w-6/12  flex lg:justify-end">
                        <div className="">
                          <div className="font-medium mb-4 ">Ticket Details</div>
                          <div className="flex flex-wrap gap-6">
                            {/* Details */}
                            <div style={{ color: "#828282" }}>
                              <div>Title</div>
                              <div>Location</div>
                              <div>Priority</div>
                              <div>Category</div>
                              <div>Description</div>
                            </div>
                            {/* Values */}
                            <div>
                              <div>{ticket.title || "null"}</div>
                              <div>{ticket.location || "null"}</div>
                              <div>{ticket.priority || "null"}</div>
                              <div>{ticket.ticketCategoryName || "null"}</div>
                              <div>{ticket.description || "null"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>


                    {/* Attachement */}
                {
                  ticket.fileUrl &&
                      <div className="w-full h-[112px] flex flex-col gap-[16px] mt-[30px]">
                      <div className="h-[24px] flex items-center">
                        <span className="text-[16px] font-medium leading-[24px] text-[#000000]">
                          Attachment
                        </span>
                      </div>
                      <div className="w-full h-[72px] flex gap-[12px] p-[16px] border border-[#E4ECF5] bg-[#F8FAFE]">
                        <div className="w-[28px] h-[28px]">
                          <PdfIcon />
                        </div>

                        <div className="flex-1 h-[40px] flex flex-col pl-[5px] gap-[6px]">
                          <div className="text-[14px] font-medium leading-[22px] text-left text-[#324054]">
                              {ticket.fileTitle}
                          </div>
                          <div className="text-[12px] font-normal leading-[16px] tracking-[-0.005em] text-left text-[#71839B]">
                            {/* 313 KB . 31 Aug, 2022 */}
                            {formattedDate}
                          </div>
                        </div>

                        <div className="w-[40px] h-[16px] flex justify-center items-center gap-[8px] mt-[10px]">
                          <button className="w-[16px] h-[16px]" onClick={handleDownload}>
                              <DownloadIcon />
                          </button>
                          <div className="w-[16px] h-[16px]">
                              <TrashIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                }
                   
                </div>
                :
                <div className="flex justify-center">
                    <BeatLoader size={30} color="#0070FF" /> 
                </div>



              }


          
          </>
  );
}
