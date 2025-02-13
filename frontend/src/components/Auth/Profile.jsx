import { User } from 'lucide-react';
import { Steps } from './Steps';
import { useState } from 'react';

const ProfileCompletionForm = () => {
  const [selectedSex, setSelectedSex] = useState(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <Steps />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Complete Your Profile</h2>
          <p className="text-gray-600 mt-2">Tell us more about you</p>
        </div>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Full Name"
              />
            </div>
          </div>

          {/* Sex Selection - Radio Buttons */}
          <div>
            <p className="text-gray-700 font-medium mb-2">Select your sex:</p>
            <div className="flex gap-4 justify-center">
              {/* Male Option */}
              <label
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition ${
                  selectedSex === 'male' ? 'bg-indigo-100 border-indigo-500' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  className="hidden"
                  onChange={() => setSelectedSex('male')}
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition ${
                    selectedSex === 'male' ? 'border-indigo-500' : 'border-gray-400'
                  }`}
                >
                  {selectedSex === 'male' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                </div>
                <span className="text-gray-700 font-medium">Male</span>
              </label>

              {/* Female Option */}
              <label
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition ${
                  selectedSex === 'female' ? 'bg-indigo-100 border-indigo-500' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  className="hidden"
                  onChange={() => setSelectedSex('female')}
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition ${
                    selectedSex === 'female' ? 'border-indigo-500' : 'border-gray-400'
                  }`}
                >
                  {selectedSex === 'female' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                </div>
                <span className="text-gray-700 font-medium">Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export { ProfileCompletionForm };
