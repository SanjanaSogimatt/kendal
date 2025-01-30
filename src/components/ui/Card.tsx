'use client'
import React, { memo, useMemo, useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useInView } from '@/hooks/useInView'
import { motion } from 'framer-motion'

interface CardProps {
  displayId: string;
  price: number;
  streetName: string;
  streetNum: string;
  city: string;
  state: string;
  pin: string;
  img: string;
  beds: number;
  baths: number;
  sqft: number;
  mlsNumber: string;
}

const Card = memo(function Card({ 
  displayId,
  price,
  streetName,
  streetNum,
  city,
  state,
  pin,
  img,
  beds,
  baths,
  sqft,
  mlsNumber
}: CardProps) {
  const router = useRouter();
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(true);
  
  const formatter = useMemo(() => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }), []);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.replace(`/edit/${displayId}`)
  }

  useEffect(() => {
    if (isInView && !imageSrc) {
      setImageSrc(img);
    }
  }, [isInView, img, imageSrc]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="border border-black rounded-lg p-1 bg-white hover:shadow-lg cursor-pointer transition-all duration-200 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="max-w-2xl overflow-hidden">
        <div className="relative aspect-[4/3]">
          {/* Skeleton loader */}
          <div 
            className={`absolute inset-0 bg-gray-200 animate-pulse rounded-lg transition-opacity duration-300 ${
              imageLoading ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Main image - Always present but hidden until loaded */}
          <img
            src={imageSrc || '/placeholder-image.jpg'}
            alt="Property image"
            width={600}
            height={400}
            className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
          />

          {/* Price tag overlay */}
          <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full shadow-md">
            <span className="text-lg font-bold text-black">
              {formatter.format(price)}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Property details */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{beds} beds</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{baths} baths</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>{sqft} sqft</span>
              </div>
            </div>
            
            <button 
              className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors duration-200"
              onClick={handleEdit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>

          {/* Address */}
          <div className="text-gray-600">
            <p className="font-medium">{streetNum} {streetName}</p>
            <p className="text-sm">{city}, {state} {pin}</p>
          </div>

          {/* MLS Number */}
          <div className="text-xs text-gray-500 pt-2 border-t">
            MLS®: {mlsNumber}
          </div>
        </div>
      </div>
    </motion.div>
  )
});

export default Card;