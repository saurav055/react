import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { ScreenContainer } from "components";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import hit from "service";
import Loader from "../../../components/loader";
import { setUserData } from "redux_store/features/Auth";
import ApiService from "./Services/ApiService";
import CryptoJS from "crypto-js";
const { v4: uuidv4 } = require("uuid");

export default function AddMoneyToWallet() {
  const user = useSelector((state) => state?.auth)?.user;
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails();
    checkPaymentStatus();
  }, []);

  useEffect(() => {
    if (money > 0) {
      fetchPaymentDetails();
    }
  }, [money]);

  const fetchPaymentDetails = async () => {
    const email = user.email; // Replace with actual email
    const phone = user.phone; // Replace with actual phone number
    const amount = money; // Replace with actual amount
    const customerId = user._id; // Replace with actual customer ID

    try {
      const data = await ApiService.payUBuy(email, phone, amount, customerId);
      if (data.success) {
        setPaymentDetails(data.info);
      } else {
        console.error("Failed to fetch payment details:", data);
        setError("Failed to fetch payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("Error fetching payment details");
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const handlePayNow = () => {
    const form = document.createElement("form");
    form.action = paymentDetails.payu_url;
    form.method = "post";
    form.style.display = "none";

    // Add mandatory fields
    const mandatoryFields = {
      key: paymentDetails.payu_merchant_key,
      productinfo: paymentDetails.plan_name,
      surl: paymentDetails.surl,
      furl: paymentDetails.furl,
      hash: paymentDetails.payu_sha_token,
      firstname: paymentDetails.first_name,
      phone: paymentDetails.mobile,
    };

    for (const key in mandatoryFields) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = mandatoryFields[key];
      form.appendChild(input);
    }

    // Add other payment details
    const additionalFields = {
      email: paymentDetails.email,
      curl: paymentDetails.payu_cancel_url,
      furl: paymentDetails.payu_fail_url,
      txnid: paymentDetails.txnId,
      amount: paymentDetails.amount,
      service_provider: paymentDetails.service_provider,
    };

    for (const key in additionalFields) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = additionalFields[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const checkPaymentStatus = () => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status === "success") {
      addTransaction();
    } else if (status === "failure") {
      setError("Payment failed. Please try again.");
    }
  };

  const getSecretEky = async () => {
    try {
      setLoading(true);
      let res = await hit("/user/generateSecretKey", "post", {
        amount: money,
        customer_id: user?.account_id,
        description: "postman",
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      let res = await hit("/user/getProfile", "post", {});
      if (!res.err) {
        dispatch(setUserData({ user: res.data }));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async () => {
    try {
      setLoading(true);
      let res = await hit("/user/addTransaction", "post", {
        amount: money,
        description: `Added to wallet`,
      });
      if (!res.err) {
        window.location.reload();
        getUserDetails();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer
      style={{ paddingX: { mobile: "5%", laptop: "10%", minHeight: "50vh" } }}
    >
      <Typography textAlign="center" fontSize="1.5em">
        Add Money to Wallet
      </Typography>
      <Typography textAlign="center" color="secondary.main" my={"1em"}>
        Available Balance : ₹{user?.balance}
      </Typography>

      <Box display="flex" justifyContent="center">
        <TextField
          name="phone"
          type="number"
          value={money}
          onChange={(e) => {
            setMoney(e.target.value);
          }}
          placeholder="Enter amount in ₹"
          id="phone"
          sx={{
            width: { mobile: "80%", laptop: "25%" },
            "& label.Mui-focused": {
              color: "secondary.main",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "secondary.main",
              },
            },
          }}
        />
        <Button
          sx={{ marginLeft: "1em" }}
          onClick={handlePayNow}
          variant="contained"
        >
          Proceed
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        alignSelf="center"
        marginTop={"1em"}
        justifyContent="space-evenly"
      >
        {/* Removed Stripe Elements code */}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        alignSelf="center"
        justifyContent="space-evenly"
      >
        {[
          5 * 82,
          10 * 82,
          15 * 82,
          20 * 82,
          25 * 82,
          30 * 82,
          35 * 82,
          40 * 82,
          45 * 82,
          50 * 82,
        ].map((x) => {
          return (
            <Box
              key={x}
              onClick={() => {
                setMoney(x);
              }}
              sx={{
                border: "1px solid gray",
                borderLeft: "4px solid gold",
                borderRight: "4px solid gold",
                padding: "2em",
                borderRadius: "40px",
                marginTop: "1em",
                justifyContent: "center",
                "&:hover": {
                  boxShadow: "2px 2px 5px gray",
                  cursor: "pointer",
                },
                width: { mobile: "30%", laptop: "18%" },
              }}
            >
              <Typography fontSize="2em" textAlign="center">
                ₹{x}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {loading && <Loader />}
    </ScreenContainer>
  );
}
