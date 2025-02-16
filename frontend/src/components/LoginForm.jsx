import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react";
import { logIn } from "../api/api";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { handleInputChange } from "../helper/function";
import { SubmitBtn } from "./SubmitBtn";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (data) => logIn(data), // ✅ Receive formData dynamically
    onSuccess: (data) => {
      dispatch(login(data)); // Update Redux state
      navigate(data.success ? "/home" : "/verify");
    },
    onError: (error) => {
      setErrors(error.response?.data?.errors || { general: "Login failed. Try again." });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({}); // Clear errors before submission
    loginMutation(formData); // ✅ Pass formData dynamically
  };


  return (
    <>
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              value={formData.email}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
              `}
              placeholder="Email address"
              required
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                ${errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
              `}
              placeholder="Password"
              required
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

        <SubmitBtn isPending={isPending} title="Sign in" pandingTitle="Signing in ..." />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {"Don't"} have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Create one
        </Link>
      </p>
    </>
  );
};

export { LoginForm };
