// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../utils/axiosInstance';
// import Toast from '../../components/Toast';

// function Section({ title, children }) {
//   return (
//     <div className="rounded-xl border border-[#C8A253]/10 bg-[#111] p-6 mb-6">
//       <h3 className="text-sm font-semibold text-[#C8A253] uppercase tracking-wider mb-5">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value, onChange, type = 'text', full = false, disabled = false }) {
//   return (
//     <div className={`relative ${full ? 'md:col-span-2' : ''}`}>
//       <input
//         type={type}
//         value={value || ''}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder=" "
//         disabled={disabled}
//         className={`peer w-full bg-[#1A1A1A] border border-[#C8A253]/20 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none focus:border-[#C8A253]/60 transition-colors ${
//           disabled ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//       />
//       <label className="absolute left-4 top-1 text-[10px] text-[#C8A253] uppercase tracking-widest pointer-events-none">
//         {label}
//       </label>
//     </div>
//   );
// }

// export default function AdminProfile() {
//   const { user } = useAuth();
//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/admin/profile');
//       setForm(res.data.admin);
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Failed to load profile.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     if (!form.name || !form.email) {
//       showToast('Name and email are required.', 'error');
//       return;
//     }

//     try {
//       setSaving(true);
//       const res = await api.put('/admin/profile', {
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         address: form.address,
//       });
//       showToast(res.data.message || 'Profile updated successfully.');
//       setForm(res.data.admin);
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Save failed.', 'error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="text-gray-500 text-sm">Loading profile...</p>;
//   if (!form) return <p className="text-gray-500 text-sm">Profile not found.</p>;

//   return (
//     <div>
//       {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-serif text-[#C8A253]">My Profile</h1>
//           <p className="text-gray-500 text-sm mt-1">Manage your admin account information</p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="px-6 py-2.5 rounded-lg bg-[#C8A253] text-black text-sm font-semibold hover:bg-[#d4af65] disabled:opacity-50 transition-colors"
//         >
//           {saving ? 'Saving...' : 'Save Changes'}
//         </button>
//       </div>

//       <Section title="Account Information">
//         <Field label="Name" value={form.name} onChange={(v) => handleInputChange('name', v)} />
//         <Field label="Email" value={form.email} onChange={(v) => handleInputChange('email', v)} type="email" />
//       </Section>

//       <Section title="Account Status">
//         <Field label="Role" value={form.role} disabled={true} />
//         <Field label="Status" value={form.isActive ? 'Active' : 'Suspended'} disabled={true} />
//       </Section>

//       <Section title="Account Created">
//         <Field
//           label="Created Date"
//           value={new Date(form.createdAt).toLocaleDateString()}
//           disabled={true}
//         />
//       </Section>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axiosInstance';
import Toast from '../../components/Toast';
// ⚡ Eye aur EyeOff icons add kar diye gaye hain
import { User, Mail, Shield, Calendar, Activity, Save, Loader2, Lock, Key, Eye, EyeOff } from 'lucide-react'; 

function Section({ title, icon: Icon, children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur-md transition-all duration-500 hover:border-[#C8A253]/30 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgba(200,162,83,0.05)] ${className}`}>
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        {Icon && (
          <div className="p-2 rounded-xl bg-[#C8A253]/10 text-[#C8A253]">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        <h3 className="text-sm font-semibold text-white tracking-wide">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

// ⚡ FIELD COMPONENT UPDATED WITH EYE BUTTON
function Field({ label, value, onChange, type = 'text', full = false, disabled = false, icon: Icon }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`relative group ${full ? 'md:col-span-2' : ''}`}>
      {Icon && (
        <Icon 
          size={16} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 group-focus-within:text-[#C8A253] transition-colors duration-300" 
        />
      )}
      <input
        type={inputType}
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder=" "
        disabled={disabled}
        // ⚡ Password field mein right side (pr-11) padding add ki taaki text icon se na takraye
        className={`peer w-full bg-black/40 border border-white/10 rounded-xl ${Icon ? 'pl-11' : 'px-4'} ${isPassword ? 'pr-11' : 'pr-4'} pt-6 pb-2 text-white text-[13px] outline-none focus:border-[#C8A253]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#C8A253]/20 transition-all duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed bg-black/20 border-transparent' : 'hover:border-white/20'
        }`}
      />
      <label className={`absolute ${Icon ? 'left-11' : 'left-4'} top-2.5 text-[10px] text-gray-500 uppercase tracking-widest pointer-events-none transition-all duration-300 peer-focus:text-[#C8A253] peer-focus:text-[9px] peer-[&:not(:placeholder-shown)]:text-[9px] peer-[&:not(:placeholder-shown)]:text-gray-400`}>
        {label}
      </label>

      {/* ⚡ Eye Button (Sirf tab dikhega jab field type="password" ho) */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C8A253] transition-colors duration-300 focus:outline-none"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
}

export default function AdminProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [savingPassword, setSavingPassword] = useState(false);

  const showToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/profile');
      setForm(res.data.admin);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to load profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      showToast('Name and email are required.', 'error');
      return;
    }

    try {
      setSaving(true);
      const res = await api.put('/admin/profile', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      });
      showToast(res.data.message || 'Profile updated successfully.');
      setForm(res.data.admin);
    } catch (err) {
      showToast(err.response?.data?.error || 'Save failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      return showToast('Please fill all password fields.', 'error');
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      return showToast('New passwords do not match.', 'error');
    }
    
    try {
      setSavingPassword(true);
      const res = await api.put('/admin/update-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      showToast(res.data.message || 'Password updated successfully.');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }); 
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to update password.', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 text-[#C8A253] animate-spin" />
      <p className="text-gray-400 text-sm tracking-widest uppercase">Loading profile...</p>
    </div>
  );
  
  if (!form) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-gray-500 text-sm bg-white/5 px-6 py-3 rounded-lg">Profile not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen rounded-2xl bg-[#0a0a0a] p-4 md:p-8 lg:p-12 font-sans selection:bg-[#C8A253]/30">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A253]/10 border border-[#C8A253]/20 mb-4">
              <Shield size={12} className="text-[#C8A253]" />
              <span className="text-[10px] uppercase tracking-widest text-[#C8A253] font-semibold">Admin Panel</span>
            </div>
            <h1 className="text-3xl md:text-4xl tracking-tight text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Profile
            </h1>
            <p className="text-gray-400 text-sm">Manage your administrative account preferences and details.</p>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A253] to-[#d4af65] text-black text-sm font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(200,162,83,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            {saving ? <Loader2 size={16} className="animate-spin relative z-10" /> : <Save size={16} className="relative z-10" />}
            <span className="relative z-10">{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Section title="Account Information" icon={User}>
              <Field 
                label="Full Name" 
                value={form.name} 
                onChange={(v) => handleInputChange('name', v)} 
                icon={User}
                full 
              />
              <Field 
                label="Email Address" 
                value={form.email} 
                onChange={(v) => handleInputChange('email', v)} 
                type="email" 
                icon={Mail}
              />
              <Field 
                label="Phone Number" 
                value={form.phone} 
                onChange={(v) => handleInputChange('phone', v)} 
                type="tel" 
              />
              <Field 
                label="Address" 
                value={form.address} 
                onChange={(v) => handleInputChange('address', v)} 
                full 
              />
            </Section>

            <Section title="Security & Password" icon={Lock}>
              <Field
                label="Current Password"
                type="password"
                value={passwords.currentPassword}
                onChange={(v) => setPasswords(p => ({ ...p, currentPassword: v }))}
                icon={Lock}
                full
              />
              <Field
                label="New Password"
                type="password"
                value={passwords.newPassword}
                onChange={(v) => setPasswords(p => ({ ...p, newPassword: v }))}
                icon={Key}
              />
              <Field
                label="Confirm New Password"
                type="password"
                value={passwords.confirmPassword}
                onChange={(v) => setPasswords(p => ({ ...p, confirmPassword: v }))}
                icon={Key}
              />
              <div className="md:col-span-2 flex justify-end mt-2">
                <button
                  onClick={handlePasswordUpdate}
                  disabled={savingPassword}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#C8A253] text-[11px] font-bold uppercase tracking-widest hover:bg-[#C8A253]/10 hover:border-[#C8A253]/30 disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
                >
                  {savingPassword ? <Loader2 size={14} className="animate-spin" /> : <Shield size={14} />}
                  Update Password
                </button>
              </div>
            </Section>
          </div>

          <div className="flex flex-col gap-6">
            <Section title="System Status" icon={Activity}>
              <Field 
                label="Access Role" 
                value={form.role || 'Admin'} 
                disabled={true} 
                icon={Shield}
                full
              />
              <Field 
                label="Account Status" 
                value={form.isActive === false ? 'Suspended' : 'Active'} 
                disabled={true} 
                full
              />
            </Section>

            <Section title="History" icon={Calendar}>
              <Field
                label="Member Since"
                value={form.createdAt ? new Date(form.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Not Available'}
                disabled={true}
                full
              />
            </Section>
          </div>
          
        </div>
      </div>
    </div>
  );
}