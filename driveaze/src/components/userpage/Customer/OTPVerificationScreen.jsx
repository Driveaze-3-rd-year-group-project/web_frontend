import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../../UserContext';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const { userData } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpData, setOtpData] = useState({
    phoneNumber: '',
    otp: '',
    userId: '',
  });

  console.log('User Data:', userData);
  console.log('OTP Data:', otpData);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
  
    // Check if the OTP is fully entered
    if (otpValue.length !== 6) {
      setError('Please enter all digits');
      return;
    }
  
    const phoneNumber = userData.phoneNumber;
    const userId = userData.userId;

    // Instead of setting state and using otpData, create the payload directly
    const payload = {
      phoneNumber,
      otp: otpValue,
      userId
    };
  
    setIsSubmitting(true);
    try {
      // Use the payload directly instead of otpData
      const response = await UserService.verifyOTP(payload);
  
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setError(response.message || 'Failed to verify OTP');
        toast.error(response.message || 'Failed to verify OTP');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error verifying OTP:', error.response ? error.response.data : error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    // Handle resend logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verification Code</h2>
          <p className="mt-2 text-gray-600">
            We have sent a verification code to your phone number
          </p>
        </div>

        <form className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-12 text-center text-xl font-semibold text-gray-800 bg-transparent outline-none border focus:border-indigo-600 rounded-lg"
                required
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-4 py-3 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 disabled:bg-indigo-300"
          >
              {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Didn't receive code?{' '}
            {timer > 0 ? (
              <span className="text-gray-500">Resend in {timer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Resend Code
              </button>
            )}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium duration-150"
          >
            Back
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default OTPVerification;