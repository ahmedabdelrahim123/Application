import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";


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

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/signin"); // Redirect to sign-in after signup
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
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
                {...register("password", { required: "Password is required" })}
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
