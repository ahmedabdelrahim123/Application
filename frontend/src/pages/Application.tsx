import React from "react";
import { useNavigate } from "react-router-dom";

const Application: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin"); // Redirect to Sign-in
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center" style={{ width: "400px" }}>
        <h2 className="mb-4">Welcome to the Application</h2>
        <p className="text-muted">You are now logged in.</p>
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Application;

