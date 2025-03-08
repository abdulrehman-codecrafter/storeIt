// import React from 'react'

// export default function Others() {
//   return (
//     <div class="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col items-center text-center relative">
//         <div class="absolute -top-8">
//             <div class="bg-blue-200 rounded-full p-3">
//                 <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
//                 </svg>
//             </div>
//         </div>
//         <div class="mt-12 text-4xl font-bold text-gray-800">20 GB</div>
//         <div class="text-xl font-semibold text-gray-700 mt-2">Images</div>
//         <hr class="my-4 border-gray-300 w-3/4" />
//         <div class="text-gray-500 text-sm">Last update</div>
//         <div class="text-gray-800 font-medium mt-1">10:15am, 10 Oct</div>
//     </div>
//   )
// }

import { ImageIcon } from "lucide-react";

export default function StorageCard() {
  return (
    <div className="relative p-6 rounded-[30px] shadow-lg bg-white max-w-sm overflow-hidden">
      {/* Icon */}
      <div className="absolute -top-6 left-4 bg-blue-500 p-4 rounded-full">
        <ImageIcon className="text-white w-8 h-8" />
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Images</h2>
          <span className="text-lg font-bold">20 GB</span>
        </div>
        
        <p className="text-gray-400 mt-2">Last update</p>
        <p className="text-gray-600 font-medium">10:15am, 10 Oct</p>
      </div>
      
      {/* Curved Border Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white rounded-[50px] -z-10" />
    </div>
  );
}
