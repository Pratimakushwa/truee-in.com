import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, Users, Wallet } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

export default function RewardAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/admin/rewards/analytics')
      .then(({ data }) => { if (data.success) setAnalytics(data.analytics); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-gray-400 animate-pulse">Loading analytics...</div>;

  const a = analytics || {};
  const cards = [
    { label: 'Total Coins Issued', value: a.totalCoinsIssued ?? 0, icon: Coins, color: 'text-[#C8A253]' },
    { label: 'Total Coins Redeemed', value: a.totalCoinsRedeemed ?? 0, icon: TrendingUp, color: 'text-green-400' },
    { label: 'Active Wallet Value', value: `₹${a.activeWalletValue ?? 0}`, icon: Wallet, color: 'text-blue-400' },
    { label: 'Pending Rewards', value: a.pendingRewards ?? 0, icon: Users, color: 'text-purple-400' },
    { label: 'Active Wallets', value: a.activeWallets ?? 0, icon: Users, color: 'text-gray-400' },
    { label: 'Reward Usage %', value: `${a.rewardUsagePercent ?? 0}%`, icon: TrendingUp, color: 'text-[#C8A253]' },
  ];

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-serif text-[#C8A253] mb-2">Reward Analytics</h1>
      <p className="text-gray-500 text-sm mb-8">Loyalty program performance overview</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-[#C8A253]/20 rounded-xl p-5">
            <Icon size={20} className={`${color} mb-3`} />
            <p className="text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
          </div>
        ))}
      </div>

      {a.topCustomers?.length > 0 && (
        <div className="bg-[#111] border border-[#C8A253]/20 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Top Customers by Balance</h2>
          <div className="space-y-3">
            {a.topCustomers.map((w, i) => (
              <div key={w._id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C8A253]/20 text-[#C8A253] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{w.user?.name || 'Customer'}</p>
                    <p className="text-gray-500 text-xs">{w.user?.email}</p>
                  </div>
                </div>
                <span className="text-[#C8A253] font-bold">{w.availableCoins} coins</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
