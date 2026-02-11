import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import GoogleIcon from '../../Components/GoogleIcon';
import GuestLayout from '@/Layouts/GuestLayout';

export default function OtpLogin() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);

  const { data, setData, post, processing } = useForm({
    email: '',
    otp: '',
  });

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (!otpSent || timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- OTP Input Logic ---------------- */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    setData('otp', updatedOtp.join(''));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* ---------------- Actions ---------------- */
  const sendOtp = () => {
    post('/send-otp', {
      onSuccess: () => {
        setOtpSent(true);
        setTimer(60);
        inputsRef.current[0].focus();
      },
    });
  };

  const verifyOtp = e => {
    e.preventDefault();
    post('/verify-otp');
  };

  const resendOtp = () => {
    setTimer(60);
    sendOtp();
  };

  /* ---------------- UI ---------------- */
  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold text-center mb-6">
        OTP Login
      </h2>

      {/* Email Input */}
      {!otpSent && (
        <>
          <input
            type="email"
            placeholder="Enter email"
            className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5 mb-4"
            onChange={e => setData('email', e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 text-white rounded-lg py-2.5"
          >
            Send OTP
          </button>
        </>
      )}

      {/* OTP Section */}
      {otpSent && (
        <form onSubmit={verifyOtp}>
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={e => handleChange(e.target.value, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center text-sm mb-4">
            {timer > 0 ? (
              <span>Resend OTP in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={resendOtp}
                className="text-blue-600 underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-green-600 text-white rounded-lg py-2.5"
          >
            Verify & Login
          </button>
        </form>
      )}

      {/* OAuth Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t" />
        <span className="mx-3 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t" />
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3">
      <a
  href="/auth/google"
  className="w-full flex items-center justify-center gap-3 border rounded-lg py-2.5 hover:bg-gray-50"
>
  <GoogleIcon />
  <span className="font-medium text-gray-700">
    Continue with Google
  </span>
</a>


      </div>
    </GuestLayout>
  );
}
