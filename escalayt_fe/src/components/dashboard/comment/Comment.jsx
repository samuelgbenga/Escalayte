/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import image1 from "/src/assets/comment-images/image1.svg";
import attachmentIcon from "/src/assets/comment-images/attachment-icon.svg";
import replyIcon from "/src/assets/comment-images/reply-icon.svg";

const API_URL = "http://localhost:8080/api/v1/ticket"; // Base URL for the API
const token = localStorage.getItem("token");

export const Comment = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replies, setReplies] = useState({});
  const [showReplies, setShowReplies] = useState({}); // Track visibility of replies
  const [fetchedReplies, setFetchedReplies] = useState({}); // Store fetched replies
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/${ticketId}/get-comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched comments:", response.data); // Log fetched comments
      setComments(response.data);
    } catch (error) {
      console.error(
        "Error fetching comments:",
        error.response?.data || error.message
      ); // Improved error logging
    }
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return; // Prevent posting empty comments

    try {
      console.log("Posting comment with token:", token); // Debug token
      const response = await axios.post(
        `${API_URL}/${ticketId}/create-comment`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Posted comment:", response.data); // Log posted comment

      fetchComments();

      setNewComment("");
    } catch (error) {
      console.error(
        "Error posting comment:",
        error.response?.data || error.message
      ); // Improved error logging
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplies((prev) => ({
      ...prev,
      [commentId]: "",
    }));
  };

  const handlePostReply = async (commentId) => {
    console.log(commentId);
    console.log(ticketId);
    const replyText = replies[commentId];
    if (!replyText.trim()) return;

    try {
      await axios.post(
        `${API_URL}/${ticketId}/comment/${commentId}/create-reply`,
        { comment: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReplyingTo(null);
      setReplies((prev) => ({ ...prev, [commentId]: "" }));
      fetchComments();
    } catch (error) {
      console.error(
        "Error posting reply:",
        error.response?.data || error.message
      );
    }
  };

  const handleReplyChange = (commentId, text) => {
    setReplies((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleViewReplies = async (commentId) => {
    if (showReplies[commentId]) {
      setShowReplies((prev) => ({ ...prev, [commentId]: false }));
    } else {
      try {
        const response = await axios.get(
          `${API_URL}/ticket/${commentId}/replies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFetchedReplies((prev) => ({ ...prev, [commentId]: response.data }));
        setShowReplies((prev) => ({ ...prev, [commentId]: true }));
      } catch (error) {
        console.error(
          "Error fetching replies:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="p-4 max-w-1180 mx-auto">
      <h4 className="mb-5">Comments</h4>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex items-start space-x-4">
              <img
                src={comment.profileUrl || image1}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-auto">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="text-[#334253] text-base font-medium leading-5">
                      {comment.fullName}
                    </div>
                    <div className="ml-2 text-xs text-gray-500">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : "Invalid Date"}
                    </div>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleReplyClick(comment.id)}
                  >
                    <img
                      src={replyIcon}
                      alt="Reply"
                      className="w-4 h-4 inline"
                    />
                    <span className="ml-1 text-xs">Reply</span>
                  </button>
                </div>
                <p className="text-[#67727E] text-left text-base font-normal leading-6">
                  {comment.comment}
                </p>
                {replyingTo === comment.id && (
                  <div className="mt-4">
                    <textarea
                      placeholder="Add a reply..."
                      rows="2"
                      value={replies[comment.id] || ""}
                      onChange={(e) =>
                        handleReplyChange(comment.id, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="bg-custom-blue text-white px-4 py-2 mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => handlePostReply(comment.id)}
                    >
                      Send Reply
                    </button>
                  </div>
                )}
                {showReplies[comment.id] &&
                  fetchedReplies[comment.id] &&
                  Array.isArray(fetchedReplies[comment.id]) && (
                    <div className="mt-4">
                      {fetchedReplies[comment.id].map((reply, replyIndex) => (
                        <div
                          key={replyIndex}
                          className="ml-8 mt-4 border-l-2 pl-4"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={reply.profileUrl || image1}
                              alt="User"
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-auto">
                              <div className="flex items-center mb-1">
                                <div className="font-semibold text-[#334253]">
                                  {reply.fullName}
                                </div>
                                <div className="ml-2 text-xs text-gray-500">
                                  {reply.createdAt
                                    ? new Date(
                                        reply.createdAt
                                      ).toLocaleDateString()
                                    : "Invalid Date"}
                                </div>
                              </div>
                              <p className="text-[#67727E] text-left">
                                {reply.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                <button
                  className="text-blue-500 hover:text-blue-700 mt-2"
                  onClick={() => handleViewReplies(comment.id)}
                >
                  {showReplies[comment.id] ? "Close Replies" : "View Replies"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 flex items-start space-x-4">
        <img src={image1} alt="User" className="w-10 h-10 rounded-full" />
        <div className="flex-1 relative">
          <textarea
            placeholder="Add a comment..."
            rows="3"
            value={newComment}
            onChange={handleNewCommentChange}
            className="w-full p-2 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            onClick={handleAttachmentClick}
          >
            <img src={attachmentIcon} alt="Attachment" className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => console.log(e.target.files)}
          />
        </div>
        <button
          className="bg-custom-blue text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handlePostComment}
        >
          Send
        </button>
      </div>
    </div>
  );
};
