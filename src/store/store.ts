// store.js
import { create } from 'zustand';

interface ListingPhoto {
  photoUrl: string;
  __typename: string;
}

export interface Listing {
  displayId: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  listPrice: number;
  closePrice: number | undefined;
  isLease: boolean;
  acreage: number;
  bathroomsTotal: number;
  bedroomsTotal: number;
  livingArea: number;
  feedId: string;
  photos: ListingPhoto[];
  standardStatus: string;
  unparsedAddress: string;
  __typename: string;
  city: string;
  country: string;
  listingId: string;
  lpCurrency: string;
  postalCode: string;
  state: string;
  streetName: string;
  streetNumber: string;
  streetSuffix: string;
  lpShowMap: boolean;
  slug: string;
  tags: string[];
  isFavorited: boolean;
  isVisible: boolean;
}

export interface StoreState {
  listings: Listing[];
  filteredListings: Listing[];
  selectedCard: Listing | null;
  selectedMarker: Listing | null;
  filters: {
    maxPrice: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    priceRange: string;
  };
  setListings: (listings: Listing[]) => void;
  setSelectedCard: (card: Listing | null) => void;
  setSelectedMarker: (marker: Listing | null) => void;
  setFilter: (key: string, value: string | number) => void;
  applyFilters: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  listings: [],
  filteredListings: [],
  selectedCard: null,
  selectedMarker: null,
  filters: {
    maxPrice: 0,
    propertyType: 'any',
    bedrooms: 0,
    bathrooms: 0,
    priceRange: 'any',
  },

  setListings: (listings) => {
    const listingsWithVisibility = listings.map(listing => ({
      ...listing,
      isVisible: true
    }));
    set({ listings: listingsWithVisibility, filteredListings: listingsWithVisibility });
  },
  
  setSelectedCard: (card) => set({ selectedCard: card }),
  
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  
  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      }
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { listings, filters } = get();
    
    const updatedListings = listings.map(listing => ({
      ...listing,
      isVisible: Boolean(
        (filters.maxPrice === 0 || listing.listPrice <= filters.maxPrice) &&
        (!filters.propertyType || 
         filters.propertyType === 'any' || 
         (listing.propertyType && filters.propertyType.toLowerCase().includes(listing.propertyType.toLowerCase()))) &&
        (filters.bedrooms === 0 ||
         listing.bedroomsTotal === null ||
         listing.bedroomsTotal === filters.bedrooms) &&
        (filters.bathrooms === 0 ||
         listing.bathroomsTotal === null ||
         listing.bathroomsTotal === filters.bathrooms)
      )
    }));

    const filteredListings = updatedListings.filter(listing => listing.isVisible);
    set({ listings: updatedListings, filteredListings });
  },
}));
