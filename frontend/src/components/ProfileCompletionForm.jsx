import { User, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { registerStep3 } from '../store/slices/userSlice';
import { completeProfile } from '../api/api';
import { handleInputChange } from '../helper/function';
import { SubmitBtn } from './SubmitBtn';

const ProfileCompletionForm = () => {
  // const user = useSelector(state => state.user)

  // Navigation
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch()
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    date_of_birth: '',
  });
  // Errors state
  const [errors, setErrors] = useState({});
  const { mutate, isPending: isSubmitting } = useMutation({
    // Mutation function
    mutationFn: (data) => completeProfile(data),
    // Handle success
    onSuccess: (data) => {
      dispatch(registerStep3(data))
      navigate('/home')
    },
    // Handle errors
    onError: (error) => {
      setErrors(error.response?.data?.errors || { general: "Login failed. Try again." });
    },
  })
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData)
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, setErrors, setFormData)}
            placeholder="Name"
            className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                  ${errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
                `}
          />
        </div>
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Date of Birth Field */}
      <div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={(e) => handleInputChange(e, setErrors, setFormData)}
            className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                  ${errors.date_of_birth ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
                `}
          />
        </div>
        {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>}
      </div>

      {/* Sex Selection - Radio Buttons */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Select your sex:</p>
        <div className="flex gap-4 justify-center">
          {/* Male Option */}
          <label
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition ${formData.sex === 'M' ? 'bg-indigo-100 border-indigo-500' : 'border-gray-300'
              }`}
          >
            <input
              type="radio"
              name="sex"
              value="M"
              className="hidden"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
            />
            <div
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition ${formData.sex === 'M' ? 'border-indigo-500' : 'border-gray-400'
                }`}
            >
              {formData.sex === 'M' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
            </div>
            <span className="text-gray-700 font-medium">Male</span>
          </label>
          {/* Female Option */}
          <label
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition ${formData.sex === 'F' ? 'bg-indigo-100 border-indigo-500' : 'border-gray-300'
              }`}
          >
            <input
              type="radio"
              name="sex"
              value="F"
              className="hidden"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
            />
            <div
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition ${formData.sex === 'F' ? 'border-indigo-500' : 'border-gray-400'
                }`}
            >
              {formData.sex === 'F' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
            </div>
            <span className="text-gray-700 font-medium">Female</span>
          </label>
        </div>
        {errors.sex && <p className="text-red-500 text-xs text-center mt-1">{errors.sex}</p>}
      </div>

      {/* Submit Button */}
      <SubmitBtn isPending={isSubmitting} title="Submit" pandingTitle="Submitting ..." />
    </form>

  );
};

export { ProfileCompletionForm };
