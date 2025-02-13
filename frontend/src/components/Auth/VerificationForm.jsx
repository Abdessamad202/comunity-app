import { MailCheck, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Steps } from './Steps';
import { useState } from 'react';
import axios from 'axios';

const VerificationForm = () => {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem('user_id');

  if (!userId) {
    console.error("User ID is missing from localStorage!");
    navigate('/register');
  }

  const [code, setCode] = useState('');
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6) {
      setCode(value);
    }
    setErrors([]);
  };

  const sendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/register/step-2/${userId}`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.success) {
        navigate('/profile');
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <Steps />

        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify your email</h2>
          <p className="text-gray-600 mt-2">Enter the verification code we sent to your email.</p>
        </div>
        <form className="space-y-6">
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="code"
                onChange={handleInputChange}
                value={code}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                  ${errors.code ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500 focus:border-transparent"}
                `}
                placeholder="Verification code"
              />
            </div>
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
          </div>

          <button
            type="submit"
            onClick={sendCode}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Verify Code
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {"Didn't"} receive the code?{' '}
          <Link to="/resend-verification" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Resend verification code
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already verified?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export { VerificationForm };
