import React, { memo, useState } from 'react';
import { Listing } from '@/store/store';

interface MarkerPopupProps {
  listing: Listing;
  onClose: () => void;
}

const MarkerPopup = memo(function MarkerPopup({ listing, onClose }: MarkerPopupProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="w-64 rounded-lg shadow-xl overflow-hidden">
      <button
        className="absolute top-1 right-1 z-10 bg-white/90 hover:bg-gray-100 rounded-full p-1
                   shadow-sm transition-colors duration-200"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image section */}
      <div className="relative aspect-[16/9]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img
          src={listing.photos?.[0]?.photoUrl || '/placeholder-image.jpg'}
          alt={`${listing.streetNumber} ${listing.streetName}`}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute bottom-1 left-1 bg-white/90 px-2 py-0.5 rounded-full shadow-sm text-sm">
          <span className="font-bold text-black">
            {formatter.format(listing.listPrice)}
          </span>
        </div>
      </div>

      <div className="p-2 space-y-1 bg-white/90">
        <h3 className="font-bold text-sm text-gray-900">
          {listing.streetNumber} {listing.streetName}
        </h3>

        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <span>{listing.bedroomsTotal} beds</span>
          <span>•</span>
          <span>{listing.bathroomsTotal} baths</span>
          <span>•</span>
          <span>{listing.livingArea} sqft</span>
        </div>

        <div className="text-[10px] text-gray-500">
          MLS®: {listing.listingId}
        </div>
      </div>
    </div>
  );
});

export default MarkerPopup; 