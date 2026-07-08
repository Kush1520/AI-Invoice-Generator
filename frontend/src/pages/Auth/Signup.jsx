import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, User, FileText } from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/authContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { DottedSurface } from "../../components/ui/dotted-surface";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const validateField = (name, value, currentFormData) => {
    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (name === "name") updated.name = validateName(value);
      if (name === "email") updated.email = validateEmail(value);
      if (name === "password") {
        updated.password = validatePassword(value);
        if (currentFormData?.confirmPassword) {
          updated.confirmPassword = validateConfirmPassword(
            currentFormData.confirmPassword,
            value
          );
        }
      }
      if (name === "confirmPassword") {
        updated.confirmPassword = validateConfirmPassword(
          value,
          currentFormData?.password || ""
        );
      }
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setError("");

    if (touched[name]) {
      validateField(name, value, updatedFormData);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value, formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setFieldErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        const { token, ...userData } = response.data;

        if (token) {
          setSuccess("Account created successfully!");
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          setTouched({ name: false, email: false, password: false, confirmPassword: false });
          setAgreedToTerms(false);
          login(userData, token);
          navigate("/dashboard");
        }
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("API error:", err.response || err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4 relative overflow-hidden transition-colors duration-300">
      

      {/* ThreeJS Background Backdrop */}
      <DottedSurface className="opacity-70 dark:opacity-100" />
      
      {/* Floating Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-[10%] left-[15%] w-[380px] h-[380px] rounded-full bg-blue-500/4 dark:bg-blue-600/5 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[25%] right-[8%] w-[480px] h-[480px] rounded-full bg-indigo-500/4 dark:bg-indigo-600/5 blur-[130px] animate-float-reverse" />
      </div>

      <div className="w-full max-w-md bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/80 p-8 rounded-3xl shadow-lg z-10 transition-all duration-300">

        {/* Icon + heading */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-blue-500/10">
            <FileText className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-50 mb-1 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Get started with InvoiceAI</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-305 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-550"
                size={16}
              />
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl bg-white/40 dark:bg-zinc-950/40 text-slate-900 dark:text-zinc-100
                  placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
                  ${fieldErrors.name && touched.name ? "border-red-400" : "border-slate-200/80 dark:border-zinc-800"}`}
              />
            </div>
            {fieldErrors.name && touched.name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-305 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-550"
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
                className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl bg-white/40 dark:bg-zinc-950/40 text-slate-900 dark:text-zinc-100
                  placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
                  ${fieldErrors.email && touched.email ? "border-red-400" : "border-slate-200/80 dark:border-zinc-800"}`}
              />
            </div>
            {fieldErrors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-305 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-550"
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
                className={`w-full pl-10 pr-10 py-3 text-sm border rounded-xl bg-white/40 dark:bg-zinc-950/40 text-slate-900 dark:text-zinc-100
                  placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
                  ${fieldErrors.password && touched.password ? "border-red-400" : "border-slate-200/80 dark:border-zinc-800"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && touched.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-350 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-550"
                size={16}
              />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Re-enter your password"
                className={`w-full pl-10 pr-10 py-3 text-sm border rounded-xl bg-white/40 dark:bg-zinc-950/40 text-slate-900 dark:text-zinc-100
                  placeholder-slate-400 dark:placeholder-zinc-650 outline-none transition-all
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
                  ${fieldErrors.confirmPassword && touched.confirmPassword ? "border-red-400" : "border-slate-200/80 dark:border-zinc-800"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {/* Terms of Service */}
          <div className="flex items-start gap-2.5 mt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked) setError("");
              }}
              className="w-4.5 h-4.5 rounded border-slate-200 dark:border-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-slate-500 dark:text-zinc-400 cursor-pointer leading-tight select-none font-medium">
              I agree to the{" "}
              <Link to="/terms" className="font-bold text-slate-800 dark:text-zinc-250 hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-bold text-slate-800 dark:text-zinc-250 hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          {success && (
            <p className="text-green-500 dark:text-green-400 text-sm text-center font-medium">{success}</p>
          )}

          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-650/10
              flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 mt-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>Create Account <span className="text-base">→</span></>
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="border-t border-slate-150 dark:border-zinc-800 mt-6 pt-5 text-center">
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-slate-800 dark:text-zinc-250 hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;