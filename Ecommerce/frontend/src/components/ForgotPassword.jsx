import React, { useState } from 'react';
import { X, Mail, KeyRound, Lock, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance'; // Apna axios instance import karo

export default function ForgotPassword({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ⚡ STEP 1: SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/forgot-password', { email });
      setSuccessMsg(data.message);
      setStep(2); // Move to OTP screen
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // ⚡ STEP 2: VERIFY OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/verify-otp', { email, otp });
      setSuccessMsg(data.message);
      setStep(3); // Move to New Password screen
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // ⚡ STEP 3: RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return setError('Password must be at least 8 characters long');
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/reset-password', { email, password: newPassword });
      setSuccessMsg(data.message);
      setStep(4); // Move to Success screen
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-2">Reset Password</h2>
          
          {/* Messages */}
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 border border-red-100">{error}</div>}
          {successMsg && step !== 4 && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md mb-4 border border-green-100">{successMsg}</div>}

          {/* ⚡ STEP 1 UI: EMAIL */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6 mt-6">
              <p className="text-sm text-gray-500">Enter your registered email address to receive an OTP.</p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" required placeholder="Email Address" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50 transition-all">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* ⚡ STEP 2 UI: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6 mt-6">
              <p className="text-sm text-gray-500">We've sent a 6-digit code to <span className="font-bold text-black">{email}</span></p>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" required maxLength="6" placeholder="Enter 6-digit OTP" 
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black outline-none tracking-[0.5em] font-bold text-center transition-all"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50 transition-all">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* ⚡ STEP 3 UI: NEW PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6 mt-6">
              <p className="text-sm text-gray-500">Create a new, strong password for your account.</p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" required placeholder="New Password" minLength="8"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50 transition-all">
                {loading ? 'Updating...' : 'Reset Password'}
              </button>
            </form>
          )}

          {/* ⚡ STEP 4 UI: SUCCESS */}
          {step === 4 && (
            <div className="text-center space-y-4 mt-6 py-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900">Password Updated!</h3>
              <p className="text-sm text-gray-500">Your password has been changed successfully.</p>
              <button onClick={onClose} className="w-full mt-4 bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all">
                Go to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}