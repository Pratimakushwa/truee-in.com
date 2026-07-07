import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosInstance';
import { Save, Plus, Trash2, FileText, ShieldCheck, RefreshCcw, Info } from 'lucide-react';

export default function ManagePolicies() {
  const [pageType, setPageType] = useState('terms');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // ⚡ Default State (Subtitle added to match your frontend)
  const [formData, setFormData] = useState({
    heroTitle: '',
    subtitle: '',
    lastUpdated: '',
    sections: [{ title: '', text: '' }]
  });

  const policyTabs = [
    { id: 'terms', name: 'Terms & Conditions', icon: <FileText size={18} /> },
    { id: 'privacy', name: 'Privacy Policy', icon: <ShieldCheck size={18} /> },
    { id: 'refund', name: 'Refund Policy', icon: <RefreshCcw size={18} /> }
  ];

  // ⚡ Fetch existing data from Database
  useEffect(() => {
    fetchPolicy();
  }, [pageType]);

  const fetchPolicy = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/legal/get-policy/${pageType}`);
      if (data?.success && data?.data) {
        setFormData(data.data);
      } else {
        resetForm();
      }
    } catch (err) {
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ heroTitle: '', subtitle: '', lastUpdated: '', sections: [{ title: '', text: '' }] });
  };

  // ⚡ Save Data to Database
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/legal/update-policy', {
        pageType, 
        ...formData
      });
      alert(`Success! ${pageType.toUpperCase()} page has been updated on the live website.`);
    } catch (err) {
      console.error(err);
      alert("Error saving data to database.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  return (
    <div className="w-full bg-[#f8f9fa] rounded-2xl p-4 md:p-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Legal & Policies</h1>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <Info size={16} className="text-[#C8A253]"/> 
          Manage the legal content that appears on the Truee Luxury storefront.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: TABS */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
            {policyTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPageType(tab.id)}
                className={`flex items-center gap-3 w-full p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pageType === tab.id 
                    ? 'bg-black text-[#C8A253] shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#C8A253] rounded-full animate-spin"></div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* HEADER DETAILS BOX */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-serif text-gray-800 mb-6 border-b border-gray-50 pb-4">Header Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Page Title</label>
                    <input 
                      className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm text-gray-800" 
                      placeholder="e.g., Terms & Conditions" 
                      value={formData.heroTitle} 
                      onChange={(e) => setFormData({...formData, heroTitle: e.target.value})} 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Last Updated</label>
                    <input 
                      className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm text-gray-800" 
                      placeholder="e.g., July 2026" 
                      value={formData.lastUpdated} 
                      onChange={(e) => setFormData({...formData, lastUpdated: e.target.value})} 
                    />
                  </div>
                </div>

                {/* Subtitle Field */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subtitle / Tagline</label>
                  <input 
                    className="w-full bg-gray-50 border border-transparent outline-none p-4 rounded-xl focus:border-[#C8A253] focus:bg-white transition-all text-sm text-gray-800" 
                    placeholder='e.g., "Excellence is not just in our products, but in our principles."' 
                    value={formData.subtitle} 
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})} 
                  />
                </div>
              </div>

              {/* CONTENT SECTIONS BOX */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
                  <h2 className="text-lg font-serif text-gray-800">Content Sections</h2>
                </div>
                
                <div className="space-y-6">
                  {formData.sections.map((sec, i) => (
                    <div key={i} className="relative bg-gray-50 p-5 rounded-xl border border-gray-100 group">
                      
                     {formData.sections.length > 1 && (
  <button 
    type="button" 
    onClick={() => removeSection(i)}
    className="absolute -top-3 -right-3 bg-white text-red-500 p-2 rounded-full shadow-md border border-red-100 hover:bg-red-500 hover:text-white transition-all z-10"
    title="Delete this section"
  >
    <Trash2 size={16} />
  </button>
)}
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Heading {i + 1}</label>
                          <input 
                            className="w-full bg-white border border-gray-200 outline-none p-3 rounded-lg focus:border-[#C8A253] transition-all text-sm font-semibold text-gray-800" 
                            placeholder="Enter section heading" 
                            value={sec.title} 
                            required
                            onChange={(e) => {
                              const newS = [...formData.sections]; 
                              newS[i].title = e.target.value; 
                              setFormData({...formData, sections: newS});
                            }} 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Description</label>
                          <textarea 
                            className="w-full bg-white border border-gray-200 outline-none p-3 rounded-lg focus:border-[#C8A253] transition-all text-sm text-gray-600 resize-y min-h-[100px]" 
                            placeholder="Write your policy text here..." 
                            value={sec.text} 
                            required
                            onChange={(e) => {
                              const newS = [...formData.sections]; 
                              newS[i].text = e.target.value; 
                              setFormData({...formData, sections: newS});
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, sections: [...formData.sections, { title: '', text: '' }]})} 
                  className="mt-6 flex items-center justify-center gap-2 w-full border border-dashed border-gray-300 text-sm font-bold text-gray-500 bg-gray-50 px-6 py-4 rounded-xl hover:bg-white hover:border-[#C8A253] hover:text-[#C8A253] transition-all"
                >
                  <Plus size={16} strokeWidth={3} /> Add New Section
                </button>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex justify-end pt-4">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#C8A253] transition-all duration-300 disabled:opacity-70 shadow-lg shadow-black/10"
                >
                  {isSaving ? 'Saving Updates...' : 'Publish to Store'} <Save size={16} />
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}