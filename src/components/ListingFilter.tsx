import React, { memo } from 'react'
import { useStore } from '@/store/store';

const ListingFilterList = memo(function ListingFilterList() {
  const { filters, setFilter } = useStore();

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white/80 backdrop-blur-md rounded-xl border border-gray-100 shadow-lg mx-4">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <select
          id="propertyType"
          className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 cursor-pointer"
          value={filters.propertyType}
          onChange={(e) => setFilter('propertyType', e.target.value)}
        >
          <option value="any">Any Property</option>
          <option value="Residential">Residential</option>
          <option value="Townhomes">Townhomes</option>
          <option value="Co-op">Co-op</option>
          <option value="Multi-family">Multi-family</option>
          <option value="Condos">Condos</option>
          <option value="Commercial">Commercial</option>
          <option value="Manufactured">Manufactured</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <select
          id="beds"
          className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 cursor-pointer"
          value={filters.bedrooms}
          onChange={(e) => setFilter('bedrooms', Number(e.target.value))}
        >
          <option value={0}>Beds</option>
          <option value={1}>1+ bed</option>
          <option value={2}>2+ beds</option>
          <option value={3}>3+ beds</option>
          <option value={4}>4+ beds</option>
        </select>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <select
          id="bath"
          className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 cursor-pointer"
          value={filters.bathrooms}
          onChange={(e) => setFilter('bathrooms', Number(e.target.value))}
        >
          <option value={0}>Baths</option>
          <option value={1}>1+ bath</option>
          <option value={2}>2+ baths</option>
          <option value={3}>3+ baths</option>
          <option value={4}>4+ baths</option>
        </select>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <select
          id="maxPrice"
          className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 cursor-pointer"
          value={filters.maxPrice}
          onChange={(e) => setFilter('maxPrice', e.target.value)}
        >
          <option value={Number.MAX_SAFE_INTEGER}>Any Price</option>
          <option value={500000}>Under $500K</option>
          <option value={1000000}>Under $1M</option>
          <option value={2000000}>Under $2M</option>
          <option value={5000000}>Under $5M</option>
          <option value={10000000}>Under $10M</option>
          <option value={Number.MAX_SAFE_INTEGER}>$10M+</option>
        </select>
      </div>
    </div>
  );
});

export default ListingFilterList;