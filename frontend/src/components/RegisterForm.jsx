import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { handleInputChange } from '../helper/function';
import { useMutation } from '@tanstack/react-query';
import { register } from '../api/api';
import { registerStep1 } from '../store/slices/userSlice';
import { useDispatch } from "react-redux";
import { SubmitBtn } from './SubmitBtn';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { mutate: registeMutation , isPending } = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: (data) => {
      dispatch(registerStep1(data))
      navigate('/verify')
    },
    onError: (error) => {
      setErrors(error.response?.data?.errors || { general: "Login failed. Try again." });
    },
  })
  const sendData = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    registeMutation(formData)
    setErrors({})
  };

  return (
    <>
      <form className="space-y-6" onSubmit={sendData}>
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                  ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
                `}
              placeholder="Email address"
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
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              value={formData.password}
              placeholder="Password"
              className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                  ${errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
                `}
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>
        <SubmitBtn isPending={isPending} title="Create account" pandingTitle="Creating ..." />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Sign in
        </Link>
      </p>
    </>
  )
}

export { RegisterForm }