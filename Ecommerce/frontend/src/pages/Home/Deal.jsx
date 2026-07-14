// import React, { useState } from 'react';
// import TextContent from './TextContent';
// import ImageSlider from './ImageSlider';

// const Deals = () => {
//   return (
//     <section className="w-full bg-[#fcfcfc] py-10 xl:py-[60px] relative z-0 overflow-hidden font-sans">
//       <div className="w-full flex flex-col xl:flex-row items-start gap-10 xl:gap-[50px] justify-center px-[20px] xl:px-[5%] max-w-[1600px] mx-auto min-h-[500px]">

//         {/* Component 1: Text Part */}
//         <div className="w-full xl:w-[35%] flex flex-col justify-start items-center xl:items-start pt-[20px] xl:pt-[80px]">
//           <div className="w-full max-w-[400px] xl:ml-auto">
//             <TextContent />
//           </div>
//         </div>

//         {/* Component 2: Slider Part */}
//         <div className="w-full xl:w-[65%] min-w-0">
//           <ImageSlider />
//         </div>
        
//       </div>
//     </section>
//   );
// };

// export default Deals;
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
