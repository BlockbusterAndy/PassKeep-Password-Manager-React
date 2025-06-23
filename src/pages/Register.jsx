import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../models/UserModel.jsx';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ ...errors, email: error.message });
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="form-control">
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;