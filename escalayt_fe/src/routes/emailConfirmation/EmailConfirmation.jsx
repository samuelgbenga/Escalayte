/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import EmailFailure from "./EmailFailure";
import EmailSuccess from "./EmailSuccess";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function EmailConfirmation() {
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const requestSent = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token && !requestSent.current) {
      requestSent.current = true;

      axios
        .get(`http://localhost:8080/api/v1/auth/confirm?token=${token}`)
        .then((response) => {
          console.log('Response:', response);
          if (response.status === 200 && response.data.message === "Email confirmed successfully") {
            setStatus("success");
          } else {
            setStatus("failure");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setStatus("failure");
        });
    }
  }, [location.search]);

  return (
    <div>
      {status === "success" && <EmailSuccess />}
      {status === "failure" && <EmailFailure />}
      {status === null && <div>Loading...</div>}
    </div>
  );
}
