import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/config"; 

const Application: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true); // Show "Logging out..." message
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000); // Delay logout by 2 seconds
    } catch (error: any) {
      console.error("Logout failed:", error);
      setLoading(false); // Reset loading state if an error occurs
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center" style={{ width: "400px" }}>
        <h2 className="mb-4">Welcome to the Application</h2>
        <p className="text-muted">{loading ? "Logging out..." : "You are now logged in."}</p>
        <button className="btn btn-danger w-100" onClick={handleLogout} disabled={loading}>
          {loading ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Application;
