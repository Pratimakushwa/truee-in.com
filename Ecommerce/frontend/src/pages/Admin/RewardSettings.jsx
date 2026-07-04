import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/Toast';

export default function RewardSettings() {
  const [settings, setSettings] = useState({
    isEnabled: true,
    isRedeemEnabled: true,
    rewardPercentage: 5,
    minOrderAmount: 0,
    maxCoinsPerOrder: 500,
    maxRedeemPerOrder: 200,
    coinExpiryDays: null,
    rewardMessage: '',
    termsAndConditions: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axiosInstance.get('/admin/rewards/settings')
      .then(({ data }) => {
        if (data.success) setSettings(data.settings);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axiosInstance.put('/admin/rewards/settings', settings);
      if (data.success) {
        setToast({ type: 'success', message: 'Settings saved successfully!' });
        setSettings(data.settings);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  const update = (key, val) => setSettings((s) => ({ ...s, [key]: val }));

  if (loading) return <div className="p-10 text-gray-400 animate-pulse">Loading settings...</div>;

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-serif text-[#C8A253] mb-2">Reward Coins Settings</h1>
      <p className="text-gray-500 text-sm mb-8">Configure your loyalty rewards program</p>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={settings.isEnabled} onChange={(e) => update('isEnabled', e.target.checked)} className="w-5 h-5 accent-[#C8A253]" />
            <span className="text-sm font-medium text-white">Enable Reward System</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={settings.isRedeemEnabled} onChange={(e) => update('isRedeemEnabled', e.target.checked)} className="w-5 h-5 accent-[#C8A253]" />
            <span className="text-sm font-medium text-white">Enable Redeem</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Reward %</label>
            <select value={settings.rewardPercentage} onChange={(e) => update('rewardPercentage', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white">
              {[3, 5, 7, 10, 15].map((p) => <option key={p} value={p}>{p}%</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Min Order Amount (₹)</label>
            <input type="number" value={settings.minOrderAmount} onChange={(e) => update('minOrderAmount', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Max Coins Per Order (Earn)</label>
            <input type="number" value={settings.maxCoinsPerOrder} onChange={(e) => update('maxCoinsPerOrder', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Max Redeem Per Order</label>
            <input type="number" value={settings.maxRedeemPerOrder} onChange={(e) => update('maxRedeemPerOrder', Number(e.target.value))} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Coin Expiry (days, optional)</label>
            <input type="number" value={settings.coinExpiryDays || ''} onChange={(e) => update('coinExpiryDays', e.target.value ? Number(e.target.value) : null)} placeholder="No expiry" className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Reward Message</label>
          <input type="text" value={settings.rewardMessage} onChange={(e) => update('rewardMessage', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Terms & Conditions</label>
          <textarea rows={4} value={settings.termsAndConditions} onChange={(e) => update('termsAndConditions', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white" />
        </div>

        <button type="submit" disabled={saving} className="bg-[#C8A253] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#d4b06a] transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
