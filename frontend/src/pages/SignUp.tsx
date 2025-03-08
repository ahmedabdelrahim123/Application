import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/config"; 

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Must contain at least one letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/\W/, "Must contain at least one special character")
    .required("Password is required"),
});

type SignUpFormData = { email: string; name: string; password: string };

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: SignUpFormData) => {
    try {  
      const formattedData = {
        name: data.name,
        email: data.email,
        password: data.password, 
      };  
      const response = await axios.post("${API_BASE_URL}/auth/signup", formattedData);
  
      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.message === "Email already exists") {
        setErrorMessage("This email is already registered. Please use a different email.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} {...register("email")} />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} {...register("name")} />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password")}
              />
              <span
                className="input-group-text bg-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
              <div className="invalid-feedback">{String(errors.password?.message)}</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <p className="text-center mt-3">
          Have an account? <Link to="/signin" className="text-primary">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
