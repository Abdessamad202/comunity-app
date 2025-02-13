import { MailCheck, Lock } from 'lucide-react'; // Import relevant icons
import { Link } from 'react-router'; // Import Link for navigation
import { Steps } from './Steps';

const VerificationForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        {/* Steps Section */}
        <Steps />

        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify your email</h2>
          <p className="text-gray-600 mt-2">Enter the verification code we sent to your email.</p>
        </div>

        <form className="space-y-6">
          {/* Code Input Field */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="code"
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Verification code"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Verify Code
          </button>
        </form>

        {/* Link to resend code */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {"Didn't"} receive the code?{' '}
          <Link to="/resend-verification" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Resend verification code
          </Link>
        </p>

        {/* Link to sign in */}
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
