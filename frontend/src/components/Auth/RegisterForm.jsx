import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Steps } from './Steps';
import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [data, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }
  const sendData = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    try {
      const response = await axios.post(
        'http://localhost:8000/api/register/step-1',
        data, // ✅ Ensure "data" contains the correct values
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      if (response.data?.user_id && response.data?.step && response.data?.token ) {
        localStorage.setItem('user_id', String(response.data.user_id));
        localStorage.setItem('step', String(response.data.step));
        localStorage.setItem('token', String(response.data.token));
        navigate('/verify')
      }
      // 🟢 Success handling
    } catch (error) {
      // 🔴 Error handling
      if (error.response) {
        setErrors(error.response.data.errors);
        // console.log("❌ Request error:", error.response.data.errors);
      } else if (error.request) {
        console.log("❌ No response received from the server");
      } else {
        console.log("❌ Unexpected error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <Steps />
        <div className="text-center mb-8">
          {/* <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-indigo-600" />
          </div> */}
          <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
          <p className="text-gray-600 mt-2">Join us today!</p>
        </div>

        <form className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
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
                onChange={handleInputChange}
                value={data.password}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                placeholder="Password"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <button
            type="submit"
            onClick={sendData}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export { RegisterForm }