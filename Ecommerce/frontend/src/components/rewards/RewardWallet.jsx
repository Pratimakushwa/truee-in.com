import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, Download, Search, Wallet, Gift, Clock } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const TYPE_LABELS = {
  EARN: 'Earned',
  REDEEM: 'Redeemed',
  REFUND_REVERSAL: 'Refund',
  ORDER_CANCEL: 'Cancelled',
  ADMIN_CREDIT: 'Admin Credit',
  ADMIN_DEBIT: 'Admin Debit',
  EXPIRY: 'Expired',
};

export default function RewardWallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [settings, setSettings] = useState(null);

  const fetchWallet = async () => {
    try {
      const { data } = await axiosInstance.get('/wallet');
      if (data.success) {
        setWallet(data.wallet);
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (page = 1) => {
    setTxLoading(true);
    try {
      const { data } = await axiosInstance.get('/wallet/transactions', {
        params: { page, limit: 10, type: typeFilter, search },
      });
      if (data.success) {
        setTransactions(data.transactions);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTxLoading(false);
    }
  };

  useEffect(() => { fetchWallet(); }, []);
  useEffect(() => { fetchTransactions(1); }, [typeFilter, search]);

  const handleExport = async () => {
    try {
      const { data } = await axiosInstance.get('/wallet/transactions/export', {
        params: { type: typeFilter },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wallet-history.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  const w = wallet || {};

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <Wallet className="text-[#C8A253]" size={24} /> Reward Wallet
        </h2>
        <p className="text-sm text-gray-500 mt-1">{settings?.rewardMessage}</p>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white rounded-2xl p-6 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-[#C8A253] mb-2">Available Coins</p>
          <p className="text-4xl font-bold">{w.availableCoins ?? 0}</p>
          <p className="text-sm text-gray-400 mt-1">Wallet Value ₹{w.walletValue ?? 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <TrendingUp size={18} className="text-green-600 mb-2" />
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Lifetime Earned</p>
          <p className="text-2xl font-bold text-gray-900">{w.lifetimeEarned ?? 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <Gift size={18} className="text-[#C8A253] mb-2" />
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Lifetime Redeemed</p>
          <p className="text-2xl font-bold text-gray-900">{w.lifetimeRedeemed ?? 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <Clock size={18} className="text-gray-400 mb-2" />
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Pending / Expired</p>
          <p className="text-lg font-bold text-gray-900">{w.pendingCoins ?? 0} / {w.expiredCoins ?? 0}</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Coins size={18} className="text-[#C8A253]" /> Transaction History
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-40"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <button onClick={handleExport} className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {txLoading ? (
          <div className="p-12 text-center text-gray-400 animate-pulse">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="p-16 text-center">
            <Coins size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">No transactions yet</p>
            <p className="text-sm text-gray-400 mt-1">Shop and earn coins on delivered orders!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Transaction ID</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Credit</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Debit</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Balance</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{tx.transactionId}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
                        {TYPE_LABELS[tx.type] || tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-green-600 font-bold">
                      {tx.credit > 0 ? `+${tx.credit}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-red-500 font-bold">
                      {tx.debit > 0 ? `-${tx.debit}` : '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold">{tx.balanceAfter}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{tx.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="p-4 border-t border-gray-100 flex justify-center gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchTransactions(p)}
                className={`w-8 h-8 rounded text-sm font-bold ${
                  pagination.page === p ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {settings?.termsAndConditions && (
        <p className="text-xs text-gray-400 mt-6 leading-relaxed">{settings.termsAndConditions}</p>
      )}
    </div>
  );
}
