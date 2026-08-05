

import React from 'react';
import TextContent from './TextContent';
import ImageSlider from './ImageSlider';

const Deals = () => {
  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 md:px-10 xl:px-[5%]">
      <div className="w-full max-w-[1400px] mx-auto rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#f7f5ef] flex flex-col lg:flex-row">

        {/* Component 1: Text Part */}
        <div className="w-full lg:w-[45%] flex items-center px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-10 lg:py-6 xl:px-14">
          <TextContent />
        </div>

        {/* Component 2: Slider Part */}
        <div className="w-full lg:w-[54%] p-3 sm:p-4 md:p-5 lg:p-6">
          <ImageSlider />
        </div>

      </div>
    </section>
  );
};

export default Deals;
