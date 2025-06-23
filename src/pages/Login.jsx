import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../models/UserModel.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await loginUser(form);
      navigate("/");    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ ...errors, email: error.message });
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;