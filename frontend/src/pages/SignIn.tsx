import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    console.log("Sign-in Data:", data);
    navigate("/app"); // Redirect to application page on successful login
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            <div className="invalid-feedback">{String(errors.email?.message)}</div>
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
              <div className="invalid-feedback">{String(errors.password?.message)}</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>

        {/* Signup Link */}
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
