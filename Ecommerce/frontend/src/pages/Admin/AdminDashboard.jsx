

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axiosInstance'; 

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Ek hi state mein saare counts store karenge (Added couponCount)
  const [stats, setStats] = useState({ productCount: 0, orderCount: 0, userCount: 0, couponCount: 0 });

  // 2. Real API se data fetch karne ka logic
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/admin/dashboard-stats');
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Dashboard stats fetch karne me error:", error);
      }
    };

    fetchDashboardData();
  }, []); 

  // Dashboard cards matching your sidebar items (Added Coupons)
  let dashboardCards = [
    { label: 'Products', count: stats.productCount, hint: 'Manage your products inventory', path: '/admin/products' },
    { label: 'Orders',   count: stats.orderCount,   hint: 'View and manage orders', path: '/admin/orders' },
    { label: 'Users',    count: stats.userCount,    hint: 'Manage registered user accounts', path: '/admin/users' },
    // { label: 'Coupons',  count: stats.couponCount,  hint: 'Manage discount coupons', path: '/admin/coupons' } // ⚡ Naya Card
    { label: 'Coupons',  count: stats.couponCount || 0,  hint: 'Manage discount coupons', path: '/admin/coupons' }
  ];

  return (
    <div className="min-h-screen bg-white p-8"> 
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="text-2xl font-serif text-[#C8A253] mb-2" 
      >
        Welcome back, {user?.name || 'Admin'}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-gray-500 text-sm mb-8"
      >
        Here's what's happening on your platform today.
      </motion.p>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {dashboardCards.map(({ label, count, hint, path }, index) => (
          <motion.div
            key={label}
            onClick={() => path !== '#' && navigate(path)}
            
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)"
            }}
            whileHover={{ 
              scale: 1.06, 
              y: -10, 
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)" 
            }}
            whileTap={{ scale: 0.97 }}
            
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15, 
              type: "spring", 
              stiffness: 100, 
              damping: 12 
            }}
            viewport={{ once: true }}
            
            className={`rounded-xl border border-gray-200 bg-gray-50 p-6 
              ${path !== '#' ? 'cursor-pointer hover:bg-gray-100 hover:border-[#C8A253]/40 transition-colors duration-300' : ''}`}
          >
            <p className="text-xs text-[#C8A253] uppercase tracking-widest mb-3">{label}</p>
            <p className="text-3xl font-bold text-gray-800">
              {count}
            </p>
            <p className="text-xs text-gray-500 mt-2">{hint}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6"
      >
        <p className="text-sm text-gray-600">
          Navigate using the sidebar or the quick links above to manage products, view orders, or update the company profile.
        </p>
      </motion.div>
      
    </div>
  );
}