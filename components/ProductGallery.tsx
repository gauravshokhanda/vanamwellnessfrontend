'use client';

import { useState } from 'react';

const images = [
  'https://images.pexels.com/photos/7585607/pexels-photo-7585607.jpeg',
  'https://images.pexels.com/photos/5462305/pexels-photo-5462305.jpeg',
  'https://images.pexels.com/photos/3933312/pexels-photo-3933312.jpeg',
  'https://images.pexels.com/photos/6823536/pexels-photo-6823536.jpeg',
];

export default function ProductGallery() {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-light-bg rounded-2xl overflow-hidden">
        <img 
          src={images[currentImage]}
          alt="Supercharged Supplement"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              index === currentImage 
                ? 'border-[#004d26] scale-105' 
                : 'border-gray-200 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}