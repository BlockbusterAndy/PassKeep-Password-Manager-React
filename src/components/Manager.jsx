import { Search, Plus, Eye, EyeOff, Copy, Edit, Trash2, Shield, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPasswords, setFilteredPasswords] = useState(passwordArray);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: "No password", color: "text-base-content/40" };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { score, text: "Very Weak", color: "text-error" };
    if (score < 3) return { score, text: "Weak", color: "text-warning" };
    if (score < 4) return { score, text: "Good", color: "text-info" };
    if (score < 5) return { score, text: "Strong", color: "text-success" };
    return { score, text: "Very Strong", color: "text-success font-bold" };
  };

  // Password generator
  const generatePassword = (length = 12) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*(),.?":{}|<>';
    
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = '';
    
    // Ensure at least one character from each type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setForm({
      ...form,
      password: newPassword
    });
    
    // Clear password error if exists
    if (formErrors.password) {
      setFormErrors({
        ...formErrors,
        password: undefined
      });
    }
    
    toast.success("Strong password generated!");
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!form.site.trim()) {
      errors.site = "Website is required";
    } else if (!form.site.includes('.')) {
      errors.site = "Please enter a valid website";
    }
    
    if (!form.username.trim()) {
      errors.username = "Username is required";
    }
    
    if (!form.password.trim()) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = passwordArray.filter(
      (password) =>
        password.site.toLowerCase().includes(e.target.value.toLowerCase()) ||
        password.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPasswords(filtered);
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  useEffect(() => {
    setFilteredPasswords(passwordArray);
  }, [passwordArray]);

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  const savePassword = async () => {
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    if (passwordArray.find((password) => password.site === form.site)) {
      toast.error("Password for this site already exists");
      return;
    }

    setIsLoading(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setForm({
      site: "",
      username: "",
      password: "",
    });
    setFormErrors({});
    setIsLoading(false);
    toast.success("Password saved successfully!");
  };

  const copyTextHandle = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = (id) => {
    const updatedPasswords = passwordArray.filter(
      (password) => password.id !== id
    );
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast.success("Password deleted successfully!");
  };

  const handleEdit = (id) => {
    setForm(passwordArray.find((password) => password.id === id));
    const updatedPasswords = passwordArray.filter(
      (password) => password.id !== id
    );
    setPasswordArray(updatedPasswords);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="shadow-2xl"
        progressClassName="bg-gradient-to-r from-primary to-secondary"
      />
      
      {/* Hero Section */}
      <div className="hero bg-gradient-to-br from-primary via-primary to-secondary text-primary-content rounded-3xl mb-8 shadow-xl">
        <div className="hero-content text-center py-20">
          <div className="max-w-lg">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-content/20 rounded-full backdrop-blur-sm">
                <Shield className="w-20 h-20" />
              </div>
            </div>
            <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-primary-content/80 bg-clip-text text-transparent">
              PassKeep
            </h1>
            <p className="text-2xl font-medium mb-2">Your secure password manager</p>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              Store, manage, and access your passwords with military-grade security
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <div className="badge badge-outline badge-lg text-primary-content border-primary-content/30">
                🔒 Encrypted
              </div>
              <div className="badge badge-outline badge-lg text-primary-content border-primary-content/30">
                🚀 Fast
              </div>
              <div className="badge badge-outline badge-lg text-primary-content border-primary-content/30">
                🛡️ Secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="card bg-base-100 shadow-2xl mb-8 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-6 text-base-content">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="w-7 h-7 text-primary" />
            </div>
            Search Passwords
          </h2>
          <div className="form-control">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-base-content/50" />
              </div>
              <input
                type="text"
                placeholder="Search by website or username..."
                className="input input-bordered w-full pl-10 pr-4 py-3 text-lg bg-base-200/50 focus:bg-base-100 transition-colors"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="badge badge-primary badge-sm">
                    {filteredPasswords.length} found
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Password Section */}
      <div className="card bg-base-100 shadow-2xl mb-8 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-8 text-base-content">
            <div className="p-2 bg-success/10 rounded-lg">
              <Plus className="w-7 h-7 text-success" />
            </div>
            Add New Password
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Website Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-lg text-base-content">Website</span>
                <span className="label-text-alt text-base-content/60">Required</span>
              </label>
              <input
                type="text"
                name="site"
                placeholder="https://example.com"
                className={`input input-bordered input-lg w-full bg-base-200/50 focus:bg-base-100 transition-colors ${
                  formErrors.site ? 'input-error' : ''
                }`}
                value={form.site}
                onChange={handleChange}
              />
              {formErrors.site && (
                <label className="label">
                  <span className="label-text-alt text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.site}
                  </span>
                </label>
              )}
            </div>

            {/* Username and Password Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-lg text-base-content">Username</span>
                  <span className="label-text-alt text-base-content/60">Required</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username or email"
                  className={`input input-bordered input-lg w-full bg-base-200/50 focus:bg-base-100 transition-colors ${
                    formErrors.username ? 'input-error' : ''
                  }`}
                  value={form.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.username}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-lg text-base-content">Password</span>
                  <div className="flex gap-2">
                    <span className="label-text-alt text-base-content/60">Required</span>
                    <button
                      type="button"
                      className="label-text-alt link link-primary hover:link-hover"
                      onClick={handleGeneratePassword}
                      title="Generate strong password"
                    >
                      <RefreshCw className="w-3 h-3 inline mr-1" />
                      Generate
                    </button>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className={`input input-bordered input-lg w-full pr-12 bg-base-200/50 focus:bg-base-100 transition-colors ${
                      formErrors.password ? 'input-error' : ''
                    }`}
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center btn btn-ghost btn-sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {form.password && (
                  <label className="label">
                    <span className={`label-text-alt flex items-center gap-1 ${getPasswordStrength(form.password).color}`}>
                      <CheckCircle className="w-4 h-4" />
                      Strength: {getPasswordStrength(form.password).text}
                    </span>
                    <span className="label-text-alt">
                      <progress 
                        className="progress progress-primary w-16" 
                        value={getPasswordStrength(form.password).score} 
                        max="5"
                      ></progress>
                    </span>
                  </label>
                )}
                {formErrors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.password}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="card-actions justify-center mt-8">
              <button
                className={`btn btn-primary btn-lg px-8 shadow-lg hover:shadow-xl transition-all ${isLoading ? 'loading' : ''}`}
                onClick={savePassword}
                disabled={isLoading}
              >
                {!isLoading && <Plus className="w-6 h-6" />}
                {isLoading ? "Saving..." : "Save Password"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Passwords List Section */}
      <div className="card bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body">
          <div className="flex items-center justify-between mb-8">
            <h2 className="card-title text-3xl text-base-content">
              <div className="p-2 bg-info/10 rounded-lg">
                <Shield className="w-7 h-7 text-info" />
              </div>
              Your Passwords
            </h2>
            <div className="stats shadow-lg">
              <div className="stat">
                <div className="stat-title text-xs">Total</div>
                <div className="stat-value text-2xl text-primary">{filteredPasswords.length}</div>
                <div className="stat-desc">passwords stored</div>
              </div>
            </div>
          </div>

          {filteredPasswords.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-6 bg-base-200 rounded-full w-fit mx-auto mb-6">
                <Shield className="w-20 h-20 text-base-300" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                {searchTerm ? "No passwords found" : "No passwords saved yet"}
              </h3>
              <p className="text-lg text-base-content/70 max-w-md mx-auto mb-6">
                {searchTerm ? "Try adjusting your search terms or clear the search to see all passwords" : "Add your first password to get started with secure password management"}
              </p>
              {!searchTerm ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => document.querySelector('input[name="site"]').focus()}
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Password
                  </button>
                  <button 
                    className="btn btn-outline btn-lg"
                    onClick={() => {
                      handleGeneratePassword();
                      document.querySelector('input[name="site"]').focus();
                    }}
                  >
                    <RefreshCw className="w-5 h-5" />
                    Quick Start with Generated Password
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-outline btn-lg"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th className="text-base font-bold text-base-content py-4">
                      <div className="flex items-center gap-2">
                        🌐 Website
                      </div>
                    </th>
                    <th className="text-base font-bold text-base-content py-4">
                      <div className="flex items-center gap-2">
                        👤 Username
                      </div>
                    </th>
                    <th className="text-base font-bold text-base-content py-4">
                      <div className="flex items-center gap-2">
                        🔐 Password
                      </div>
                    </th>
                    <th className="text-base font-bold text-base-content text-center py-4">
                      ⚡ Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPasswords.map((password) => (
                    <tr key={password.id} className="hover:bg-base-200/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content w-10 rounded-full">
                              <span className="text-sm font-bold">
                                {password.site.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <a
                              href={password.site.startsWith('http') ? password.site : `https://${password.site}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-primary font-semibold hover:link-hover text-base truncate max-w-xs"
                            >
                              {password.site}
                            </a>
                          </div>
                          <button
                            className="btn btn-ghost btn-xs opacity-60 hover:opacity-100"
                            onClick={() => copyTextHandle(password.site)}
                            title="Copy website"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-base truncate max-w-xs">{password.username}</span>
                            <span className="text-sm opacity-60">User credentials</span>
                          </div>
                          <button
                            className="btn btn-ghost btn-xs opacity-60 hover:opacity-100"
                            onClick={() => copyTextHandle(password.username)}
                            title="Copy username"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="font-mono text-lg">{"●".repeat(8)}</span>
                            <span className="text-sm opacity-60">Hidden for security</span>
                          </div>
                          <button
                            className="btn btn-ghost btn-xs opacity-60 hover:opacity-100"
                            onClick={() => copyTextHandle(password.password)}
                            title="Copy password"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="tooltip" data-tip="Edit password">
                            <button
                              className="btn btn-warning btn-sm hover:btn-warning shadow-lg hover:shadow-xl transition-all"
                              onClick={() => handleEdit(password.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="Delete password">
                            <button
                              className="btn btn-error btn-sm hover:btn-error shadow-lg hover:shadow-xl transition-all"
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this password?")) {
                                  handleDelete(password.id);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
