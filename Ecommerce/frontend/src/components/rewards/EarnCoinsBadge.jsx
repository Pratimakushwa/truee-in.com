import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function EarnCoinsBadge({ amount, className = '' }) {
  const [coins, setCoins] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!amount || amount <= 0) return;
    axiosInstance.get('/rewards/estimate', { params: { itemsTotal: amount } })
      .then(({ data }) => {
        if (data.success) {
          setCoins(data.estimatedCoins);
          setEnabled(data.isEnabled);
        }
      })
      .catch(() => {});
  }, [amount]);

  if (!enabled || coins <= 0) return null;

  return (
    <div className={`flex items-center gap-2 bg-gradient-to-r from-[#FCFAEF] to-[#FFF9E6] border border-[#C8A253]/30 rounded-lg px-3 py-2 ${className}`}>
      <span className="text-lg">🪙</span>
      <div>
        <p className="text-[11px] font-bold text-[#8B6914] uppercase tracking-wide">
          Earn {coins} Reward Coins
        </p>
        <p className="text-[10px] text-gray-500">Worth ₹{coins} after delivery</p>
      </div>
    </div>
  );
}
