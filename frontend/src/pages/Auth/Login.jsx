import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, FileText } from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/authContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { DottedSurface } from "../../components/ui/dotted-surface";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateField = (name, value) => {
    setFieldErrors((prev) => ({
      ...prev,
      [name]: name === "email" ? validateEmail(value) : validatePassword(value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);

      if (response.status === 200) {
        const { token } = response.data;

        if (token) {
          setSuccess("Login successful! Redirecting...");
          login(response.data, token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden transition-colors duration-300">
      {/* ThreeJS Background Backdrop */}
      <DottedSurface className="opacity-100" />
      
      {/* Floating Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-[10%] left-[15%] w-[380px] h-[380px] rounded-full bg-blue-650/5 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[25%] right-[8%] w-[480px] h-[480px] rounded-full bg-indigo-650/5 blur-[130px] animate-float-reverse" />
      </div>

      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 p-8 rounded-3xl shadow-xl z-10 transition-all duration-300">

        {/* Icon + heading */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-blue-500/10">
            <FileText className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50 mb-1 tracking-tight">
            Login to Your Account
          </h1>
          <p className="text-sm text-zinc-400">Welcome back to Invoice Generator</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-zinc-350 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-550"
                size={16}
              />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl bg-zinc-950/40 text-zinc-100
                  placeholder-zinc-600 outline-none transition-all
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
                  ${fieldErrors.email && touched.email ? "border-red-400" : "border-zinc-800"}`}
              />
            </div>
            {fieldErrors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-zinc-350 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-550"
                size={16}
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-10 py-3 text-sm border rounded-xl bg-zinc-950/40 text-zinc-100
                  placeholder-zinc-600 outline-none transition-all
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
                  ${fieldErrors.password && touched.password ? "border-red-400" : "border-zinc-800"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-405 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && touched.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {success && (
            <p className="text-green-400 text-sm text-center font-medium">{success}</p>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-500/10
              flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>Sign In <span className="text-base">→</span></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-zinc-800 mt-6 pt-5 text-center">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-zinc-200 hover:underline hover:text-blue-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;