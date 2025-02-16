import { Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { handleInputChange } from '../helper/function';
import { useMutation } from '@tanstack/react-query';
import { reSendCode, VerificationEmail } from '../api/api';
import { useDispatch } from 'react-redux';
import { registerStep2 } from '../store/slices/userSlice';
import { SubmitBtn } from './SubmitBtn';

const VerificationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: '',
  });
  const [errors, setErrors] = useState({});
  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: (data) => VerificationEmail(data), // Accept dynamic data
    onSuccess: (data) => {
      dispatch(registerStep2(data));
      navigate('/profile'); // Redirect on success
    },
    onError: (error) => {
      setErrors(error.response?.data?.errors || {
        general: 'Verification failed. Try again.',
      });
    },
  });

  const { mutate: resendingCode, isPending: isReSending } = useMutation({
    mutationFn: (id) => reSendCode(id), // Accept dynamic userId
    onError: (error) => {
      setErrors(error.response?.data?.errors || { general: 'Failed to resend code. Try again.' });
    },
  });

  const sendCode = (e) => {
    e.preventDefault();
    verifyCode(formData); // Pass formData dynamically
  };

  const resendCode = (e) => {
    e.preventDefault();
    resendingCode();
  };

  return (
    <>
      <form className="space-y-6" onSubmit={sendCode}>
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="code"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              value={formData.code}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 transition outline-none
                ${errors.code ? 'border-red-500 focus:ring-red-500' : 'focus:ring-indigo-500 focus:border-transparent'}
              `}
              placeholder="Verification code"
              required
            />
          </div>
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>

        <SubmitBtn isPending={isVerifying} title="Verify Code" pandingTitle="Verifying..." />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Didn&apos;t receive the code?{' '}
        <Link
          to=""
          onClick={resendCode}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
          disabled={isReSending} // Disable while resending
        >
          {isReSending ? 'Resending...' : 'Resend Code'}

        </Link>
      </p>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already verified?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Sign in
        </Link>
      </p>
    </>
  );
};

export { VerificationForm };
