import React, { useEffect } from "react";
import axios from "axios";

function Signup() {
  const test = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/signup`,
        {
          email: "kushal2002personal@gmail.com",
          password: "12345",
          name: "Kushal",
        }
      );
      console.log("Signup Successful:", response.data);
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    test(); // Calls the signup function when the component mounts
  }, []); // Empty dependency array ensures it runs once

  return <div>Signup</div>;
}

export default Signup;
