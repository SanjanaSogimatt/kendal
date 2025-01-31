'use client'
import React from 'react';
import Card from '../ui/Card';
import { useStore } from '@/store/store';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ListingFilterList from '@/components/ListingFilter';
import MarkerCard from '@/components/map/MarkerCard';

const CardList = () => {
  const {
    filteredListings,
    setListings,
    setSelectedCard,
    selectedMarker,
    setSelectedMarker,
  } = useStore();

  const { isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const response = await axios.get('/api/listing');
      setListings(response.data.listings);
      return response.data.listings;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading properties...</div>
      </div>
    );
  }

  return (
    <>
      <div className='px-4 pt-4'>
        <ListingFilterList />
      </div>

      {selectedMarker && (
        <MarkerCard 
          listing={selectedMarker} 
          onClose={() => setSelectedMarker(null)} 
        />
      )}

      <div className="grid grid-cols-1 h-screen gap-4">
        <div className="m-4 grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-md:grid-cols-2">
          {filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <div
                key={item.displayId}
                onClick={() => setSelectedCard(item)}
              >
                <Card
                  displayId={item.displayId}
                  price={item.listPrice}
                  streetName={item.streetName}
                  streetNum={item.streetNumber}
                  city={item.city}
                  state={item.state}
                  pin={item.postalCode}
                  img={item.photos?.[0]?.photoUrl || '/placeholder-image.jpg'}
                  beds={item.bedroomsTotal}
                  baths={item.bathroomsTotal}
                  sqft={item.livingArea}
                  mlsNumber={item.listingId}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-4xl">
              Oops! No results found. Explore others
              </div>
              
          )}
        </div>
      </div>
    </>
  );
};

export default CardList;
