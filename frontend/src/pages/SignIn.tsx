import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/config"; 

type SignInFormData = { email: string; password: string };

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/protected`, {
        withCredentials: true, 
      });
      return response.data.message === "Authenticated";
    } catch (error: any) {
      console.error("Auth Check Failed");
      return false;
    }
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      setLoading(true); // ✅ Show loading state
      
      const formattedData = { email: data.email, password: data.password };
      await axios.post(`${API_BASE_URL}/auth/login`, formattedData, { withCredentials: true });

      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        setErrorMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/app"), 2000); // ✅ 2-second delay before navigating
      } else {
        setErrorMessage("Authentication failed");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        {errorMessage && <div className={`alert ${loading ? "alert-success" : "alert-danger"}`}>{errorMessage}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
