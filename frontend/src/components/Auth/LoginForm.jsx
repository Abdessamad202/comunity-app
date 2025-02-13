import { Lock, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { Steps } from './Steps';

const LoginForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <form className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                placeholder="Email address"
              />
            </div>
            {/* {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>} */}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
                placeholder="Password"
              />
            </div>
            {/* {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>} */}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {"Don't"} have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export { LoginForm }
