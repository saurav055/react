import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import hit from "service";
import CryptoJS from "crypto-js";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const payment = new URLSearchParams(location.search).get("s");

  const addTransaction = async () => {
    try {
      let res = await hit("/user/addTransaction", "post", {
        amount: payment,
        description: "Added to wallet",
      });
      if (!res.err) {
        getUserDetails();
      }
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const getUserDetails = async () => {
    try {
      let res = await hit("/user/getProfile", "post", {});
      if (!res.err) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (err) {
      console.error("Error getting user details:", err);
    }
  };

  useEffect(() => {
    getUserDetails();
    if (payment !== null) {
      addTransaction();
      navigate("/SuccessPage?s=null"); // Navigate to add_money?s=null // Navigate to add_money?s=null
    }

    // Redirect to next page after 5 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/add_money"); // Replace with your actual next page URL
    }, 3000);

    // Cleanup timeout on component unmount or if payment changes
    return () => clearTimeout(redirectTimeout);
  }, [navigate, payment]);

  return (
    <div style={{ padding: "5%" }}>
      <Typography variant="h1">Success Page</Typography>
    </div>
  );
};

export default SuccessPage;
