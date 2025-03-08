import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

type SignInFormData = { email: string; password: string };

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>(); // ✅ Define form data type
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/protected", {
        withCredentials: true, // Send cookies
      });
      console.log("Response Headers:", response.headers);
      if (response.data.message === "Authenticated") {
        return true;
      }
    } catch (error:any) {
      console.error("Auth Check Failed:", error.response?.data?.message || "Unknown error");
    }
    return false;
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const formattedData = {
        email: data.email,
        password: data.password,
      };
  
      await axios.post("http://localhost:3000/auth/login", formattedData, {
        withCredentials: true, // Ensures cookies are sent with requests
      });
  
      // Check authentication before navigating
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        navigate("/app");
      } else {
        setErrorMessage("Authentication failed");
      }
    } catch (error: any) {
      // Prevent console logging the error
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
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit(onSubmit)}> {/* ✅ No TypeScript Error */}
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

          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account? <Link to="/">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
