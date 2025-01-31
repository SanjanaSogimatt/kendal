import React, { useState, useEffect } from 'react';
import { Listing } from '@/store/store';

interface MarkerCardProps {
  listing: Listing;
  onClose: () => void;
}

const MarkerCard = ({ listing, onClose }: MarkerCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (listing?.photos?.[0]?.photoUrl) {
      setImageLoading(true);
      setShowSkeleton(true);
      
      const img = new Image();
      img.src = listing.photos[0].photoUrl;
      
      img.onload = () => {
        setImageSrc(listing.photos[0].photoUrl);
        setShowSkeleton(false);
        setImageLoading(false);
      };
    }
  }, [listing]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="m-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <div className="relative flex">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-gray-100 rounded-full p-1.5 shadow-md transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-1/3 relative">
            <div 
              className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
                showSkeleton ? 'animate-pulse opacity-100' : 'opacity-0'
              }`}
            />
            
            <div className="aspect-[4/3] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc || '/placeholder-image.jpg'}
                alt={`${listing.streetNumber} ${listing.streetName}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>

            <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full shadow-md">
              <span className="font-bold text-black">
                {formatter.format(listing.listPrice)}
              </span>
            </div>
          </div>

          <div className="w-2/3 p-4">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">
                {listing.streetNumber} {listing.streetName}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>{listing.bedroomsTotal} beds</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{listing.bathroomsTotal} baths</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>{listing.livingArea} sqft</span>
                </div>
              </div>

              <p className="text-gray-500">
                {listing.city}, {listing.state} {listing.postalCode}
              </p>

              <div className="text-xs text-gray-400">
                MLS®: {listing.listingId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerCard;