import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

export default function MyNewsletterStatus() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedAt, setSubscribedAt] = useState(null);
  const [inputEmail, setInputEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        // Logged-in user ka email profile se le lo
        const { data } = await axiosInstance.get('/auth/profile');
        const userEmail = data?.user?.email || '';
        setEmail(userEmail);
        setInputEmail(userEmail);

        // ⚡ Agar profile response me hi subscription flag mil jaye to seedha use karo
        if (typeof data?.user?.newsletterSubscribed === 'boolean') {
          setIsSubscribed(data.user.newsletterSubscribed);
          setSubscribedAt(data.user.newsletterSubscribedAt || null);
        } else {
          // Fallback: khud check karo (agar backend route allow kare)
          try {
            const check = await axiosInstance.get('/newsletter/status', {
              params: { email: userEmail },
            });
            if (check.data?.success) {
              setIsSubscribed(!!check.data.subscribed);
              setSubscribedAt(check.data.subscribedAt || null);
            }
          } catch {
            // Route na ho to bas subscribe form dikha do — koi crash nahi
          }
        }
      } catch (err) {
        console.error('Error loading newsletter status:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!inputEmail) return;
    setSubmitting(true);
    setMessage('');
    try {
      const { data } = await axiosInstance.post('/newsletter/subscribe', { email: inputEmail });
      if (data.success) {
        setIsSubscribed(true);
        setSubscribedAt(new Date().toISOString());
        setMessage('You are now subscribed!');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500 animate-pulse h-full flex items-center justify-center">
        Loading your newsletter status...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 md:mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl md:text-2xl font-serif text-black">My Newsletter</h2>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Your personal subscription status.</p>
      </div>

      <div className="max-w-md">
        {isSubscribed ? (
          <div className="bg-[#FCFAEF] border border-[#C8A253]/30 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C8A253] shadow-sm mb-4">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-[#8B6914] font-serif italic text-lg mb-1">You're Subscribed</p>
            <p className="text-gray-500 text-xs sm:text-sm break-all">{email}</p>
            {subscribedAt && (
              <p className="text-gray-400 text-[10px] sm:text-[11px] uppercase tracking-widest mt-3">
                Since {new Date(subscribedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <div className="bg-gray-50/60 border border-dashed border-gray-200 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} className="text-[#C8A253]" />
              <p className="text-gray-800 font-semibold text-sm">Not subscribed yet</p>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-5 leading-relaxed">
              Subscribe to get early access to limited releases and curated tech stories.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="Email address"
                disabled={submitting}
                className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] sm:text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 bg-black text-white hover:bg-[#C8A253] hover:text-black font-bold px-5 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.15em] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
              </button>
            </form>

            {message && <p className="text-xs text-gray-500 mt-3">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}