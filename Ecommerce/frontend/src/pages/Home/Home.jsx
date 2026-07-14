



import React, { useState, useEffect } from 'react';

import axiosInstance from '../../utils/axiosInstance';

import { useAuth } from '../../context/AuthContext';



import Header1 from './Header1';

import BrandsMarquee from './BrandsMarquee';

import Footer from './Footer';

import Cursor from './Cursor';

import Newsletter2 from '../../components/Newsletter2';

import Hero1 from './Hero1';

import HomeProductBlocks from "./HomeProductBlocks";

import CuratedPrivileges from "./CuratedPrivileges";

import RecentlyViewed from "./RecentlyViewed";

import TrendingSection from "./TrendingSection";

import CategoryShowcase from './Category';

import Deals from './Deal';

import MarshallDesign from './Views';

import FeatureBar from './FeatureBar';

import MarshallWideLayout from './MarshalWideLayout';

import TestimonialSlider from './TestimonialSlider';

import HomeCouponDisplay from './HomeCouponDisplay';

import BrandCouponDisplay from './BrandCouponDisplay';

import TrustBar from '../../components/trust/TrustBar';

import TrustSection from '../../components/trust/TrustSection';

import MobileStickyBar from '../../components/navigation/MobileStickyBar';

import { SkeletonCard } from '../../components/ui/Skeleton';



export default function Home() {

  const { user } = useAuth();

  const [homeData, setHomeData] = useState({ 

    flashDeals: [], trending: [], recommended: [], recentlyViewed: [], featured: [], newArrivals: []

  });

  const [loading, setLoading] = useState(true);



  const fetchHomeData = async () => {

    try {

      let guestId = localStorage.getItem('guestId') || ('guest_' + Math.random().toString(36).substr(2, 9) + Date.now());

      localStorage.setItem('guestId', guestId);

      

      const { data } = await axiosInstance.get(`/home?t=${Date.now()}`, {

        headers: { 'x-guest-id': guestId, 'Cache-Control': 'no-cache' }

      });

      

      if (data.success) {

        setHomeData(data.data);

      }

    } catch (error) { 

      console.error("Home API Error:", error); 

    } finally { 

      setLoading(false); 

    }

  };



  useEffect(() => { 

    fetchHomeData(); 

    window.scrollTo(0, 0); 

  }, [user]);



  const allProducts = [

    ...(homeData.featured || []),

    ...(homeData.trending || []),

    ...(homeData.newArrivals || []),

  ];



  return (

    <div className="bg-[var(--theme-bg-light)] min-h-screen pb-mobile-nav selection:bg-[var(--theme-primary)] selection:text-white transition-colors duration-500">

      <Cursor />

      <Header1 /> 

      <HomeCouponDisplay displayLocation="Home Banner" />



      <div className="bg-white relative z-20">

        {loading ? (

          <div className="w-full h-[70vh] bg-gradient-to-b from-gray-50 to-white animate-pulse flex items-center justify-center">

             <p className="text-gray-400 font-serif animate-pulse tracking-widest text-sm uppercase">Loading TRUEE...</p>

          </div>

        ) : (

          <Hero1 featuredProducts={homeData.featured || []} />

        )}

        <BrandsMarquee />

      </div>



      <TrustBar />



      {loading ? (

        <div className="px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

          <SkeletonCard />

          <SkeletonCard />

          <SkeletonCard />

        </div>

      ) : (

        <>

          <Deals />

          <HomeProductBlocks products={allProducts} />

          <MarshallWideLayout />

          <CategoryShowcase />

          <MarshallDesign />

          <TrendingSection products={allProducts} />

          <BrandCouponDisplay displayLocation="product page"/>

          <TrustSection />

          <TestimonialSlider />

          <CuratedPrivileges products={allProducts} />

        </>

      )}



      <Newsletter2 />

      <RecentlyViewed />

      {/* <FeatureBar /> */}

      <Footer />



      <MobileStickyBar />

    </div>

  );

}

