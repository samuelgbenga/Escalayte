import { useState, useEffect } from "react";
import "./App.css";

import LandingPage from "./routes/landingPage/LandingPage";
import ForgotPassword from "./routes/forgotPassword/ForgotPassword";
import Login from "./routes/login/Login";
import UserLogin from "./routes/userLogin/UserLogin";
import ResetPassword from "./routes/resetPassword/ResetPassword";
import Signup from "./routes/signup/Signup";

import AdminDashboard from "./routes/admin/dashboard/Dashboard";
import AdminTicket from "./routes/admin/tickets/Ticket";
import AdminTicketPreview from "./routes/admin/ticketPreview/TicketPreview";

import UserDashboard from "./routes/user/dashboard/Dashboard";
import UserTicket from "./routes/user/tickets/Ticket";

import TicketTable from "./components/dashboard/ticketTable/TicketTable";
import EmailConfirmation from "./routes/emailConfirmation/EmailConfirmation";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotificationTesting from "./firebase/utils/NotificationTesting";
// import axios from 'axios'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tickets" element={<AdminTicket />} />
        <Route path="/admin/tickets/:id" element={<AdminTicketPreview />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/tickets" element={<UserTicket />} />

        <Route path="/confirm-email" element={<EmailConfirmation />} />

        {/* <Route path="/testing" element={<NotificationTesting />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
