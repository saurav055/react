const axios = require("axios");

const ApiService = {
  payUBuy: async (email, phone, amount, customerId) => {
    try {
      const response = await axios.post(
        // "https://www.glistenastrology.com/api/v1/user/PayUPayments",
        "http://localhost:5000/api/v1/user/PayUPayments",
        {
          email,
          phone,
          amount,
          customerId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching payment details:", error);
      return { success: false, error: "Error fetching payment details" };
    }
  },
};

module.exports = ApiService;
