// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import heroImage from './truee-001-banner (1).png';

// export default function Hero() {
//   const navigate = useNavigate();
//   const [targetProductId, setTargetProductId] = useState(null);

//   useEffect(() => {
//     // API integration to fetch a product for the Buy Now button
//     const fetchHeroProduct = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         if (response.data && response.data.length > 0) {
//           // Selecting the first product
//           setTargetProductId(response.data[0]._id);
//         }
//       } catch (error) {
//         console.error("Error fetching product for hero section:", error);       
//       }
//     };
//     fetchHeroProduct();
//   }, []);

//   const handleShopNow = () => {
//     if (targetProductId) {
//       // API se fetched product ke details page pe le jayega
//       navigate(`/product/${targetProductId}`);
//     } else {
//       // Fallback
//       navigate('/shop');
//     }
//   };

//   return (
//     <main
//       className="w-full overflow-x-hidden relative bg-white flex flex-col justify-center items-center pt-0 px-0 cursor-pointer mt-0"
//       onClick={handleShopNow}
//     >
//       <div className="w-full m-0 p-0">
//         <img
//           src={heroImage}
//           alt="True 001 Banner"
//           className="w-full h-auto block m-0 p-0"
//         />
//       </div>
//     </main>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import heroImage from './truee-001-banner (1).png';

// export default function Hero() {
//   const navigate = useNavigate();
//   const [targetProductId, setTargetProductId] = useState(null);

//   useEffect(() => {
//     // API integration to fetch a product for the Buy Now button
//     const fetchHeroProduct = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         if (response.data && response.data.length > 0) {
//           // Selecting the first product
//           setTargetProductId(response.data[0]._id);
//         }
//       } catch (error) {
//         console.error("Error fetching product for hero section:", error);       
//       }
//     };
//     fetchHeroProduct();
//   }, []);

//   const handleShopNow = () => {
//     if (targetProductId) {
//       // API se fetched product ke details page pe le jayega
//       navigate(`/product/${targetProductId}`);
//     } else {
//       // Fallback
//       navigate('/shop');
//     }
//   };

//   return (
//     <main
//       // ⚡ FIX 1: 'min-h-[50vh] md:min-h-[85vh]' aur 'bg-[#f8f8f8]' lagaya taaki Deals section upar na aaye
//       className="w-full min-h-[50vh] md:min-h-[85vh] bg-[#f8f8f8] relative flex flex-col justify-center items-center pt-0 px-0 cursor-pointer mt-0 overflow-hidden"
//       onClick={handleShopNow}
//     >
//       <div className="w-full h-full flex items-center justify-center m-0 p-0">
//         <img
//           src={heroImage}
//           alt="True 001 Banner"
//           // ⚡ FIX 2: Browser ko order diya ki is image ko VIP priority de aur sabse pehle load kare
//           fetchPriority="high" 
//           className="w-full h-auto object-cover block m-0 p-0"
//         />
//       </div>
//     </main>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import heroImage from './hero-banner.jpg'; 

// export default function Hero() {
//   const navigate = useNavigate();
//   const [targetProductId, setTargetProductId] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false); // ⚡ Load hone ka state

//   useEffect(() => {
//     const fetchHeroProduct = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         if (response.data && response.data.length > 0) {
//           setTargetProductId(response.data[0]._id);
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);        
//       }
//     };
//     fetchHeroProduct();
//   }, []);

//   const handleShopNow = () => {
//     if (targetProductId) {
//       navigate(`/product/${targetProductId}`);
//     } else {
//       navigate('/shop');
//     }
//   };

//   return (
//     <main
//       className="w-full static flex flex-col justify-start items-center cursor-pointer overflow-hidden bg-[#f8f8f8] pt-0 mt-0"
//       onClick={handleShopNow}
//       // ⚡ Jab tak image load na ho, section ko hidden rakho
//       style={{ 
//         opacity: isLoaded ? 1 : 0, 
//         transition: 'opacity 0.6s ease-in',
//         minHeight: '500px' // Placeholder height taaki jump na ho
//       }}
//     >
//       <div className="w-full h-auto relative leading-none">
//         <img
//           src={heroImage}
//           alt="True 001 Banner"
//           fetchPriority="high"
//           onLoad={() => setIsLoaded(true)} // ⚡ Image load hote hi show hoga
//           className="w-full h-auto block object-cover"
//         />
//       </div>
//     </main>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import heroImage from './hero-banner.jpg'; 

export default function Hero() {
  const navigate = useNavigate();
  const [targetProductId, setTargetProductId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // ⚡ Load hone ka state

  useEffect(() => {
    const fetchHeroProduct = async () => {
      try {
        const response = await axiosInstance.get('/products');
        if (response.data && response.data.length > 0) {
          setTargetProductId(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);        
      }
    };
    fetchHeroProduct();
  }, []);

  const handleShopNow = () => {
    if (targetProductId) {
      navigate(`/product/${targetProductId}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <main
      // Maine yahan min-h-[200px] (mobile ke liye) aur md:min-h-[500px] (desktop ke liye) add kiya hai
      className="w-full static flex flex-col justify-start items-center cursor-pointer overflow-hidden bg-[#f8f8f8] pt-0 mt-0 min-h-[200px] md:min-h-[500px]"
      onClick={handleShopNow}
      // ⚡ Jab tak image load na ho, section ko hidden rakho
      style={{ 
        opacity: isLoaded ? 1 : 0, 
        transition: 'opacity 0.6s ease-in'
        // minHeight ko yahan se hata diya hai taaki mobile par layout kharab na ho
      }}
    >
      <div className="w-full h-auto relative leading-none">
        <img
          src={heroImage}
          alt="True 001 Banner"
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)} // ⚡ Image load hote hi show hoga
          className="w-full h-auto block object-cover"
        />
      </div>
    </main>
  );
}