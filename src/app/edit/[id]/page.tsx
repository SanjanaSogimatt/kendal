'use client';
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {useStore } from "@/store/store";

interface FormData {
  propertyType: string;
  listPrice: number;
  bathroomsTotal: number;
  bedroomsTotal: number;
  livingArea: number;
  acreage: number;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  streetName: string;
  streetNumber: string;
  closePrice?: number;
  isLease?: boolean;
  tags?: string[];
}

// Update the input and select base styles
const inputBaseStyles = `
  w-full
  px-4 
  py-2.5
  border
  border-gray-200
  rounded-lg
  bg-white
  text-gray-900
  transition-all
  duration-200
  focus:border-gray-400
  focus:ring-0
  hover:border-gray-300
`;

const ListingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const { id } = useParams();
  const listings = useStore((state) => state.listings);
  const setListings=useStore((state)=>state.setListings);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const listing = listings.find((item) => item.displayId === id);
      if (listing) {
        reset(listing); // Populate the form with the data
      } else {
        setError('Listing not found.');
      }
    }
  }, [id, listings, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const updatedDate = { ...data, displayId: id };
      const response = await axios.post(`/api/edit`, updatedDate);
      setListings(response.data.listings);
      if (response.data.success) {
       
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError('Failed to update the listing.');
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      setError('An error occurred while updating the listing.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="border-b border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Edit Listing</h1>
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 
                         bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                ← Back
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 text-center py-4">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {/* Main Details Section */}
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-6 pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Main Details</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Basic information about the property.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      {...register("propertyType", { required: "Property Type is required" })}
                      className={inputBaseStyles}
                    >
                      <option value="">Select type...</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      List Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        {...register("listPrice", { required: "List Price is required" })}
                        className={`${inputBaseStyles} pl-8`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <input
                      type="number"
                      {...register("bedroomsTotal", { required: "Bedrooms are required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <input
                      type="number"
                      {...register("bathroomsTotal", { required: "Bathrooms are required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Living Area (sqft)</label>
                    <input
                      type="number"
                      {...register("livingArea", { required: "Living Area is required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Acreage</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("acreage", { required: "Acreage is required" })}
                      className={inputBaseStyles}
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6 pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Address</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Property location details.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Number</label>
                    <input
                      {...register("streetNumber", { required: "Street Number is required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Name</label>
                    <input
                      {...register("streetName", { required: "Street Name is required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      {...register("city", { required: "City is required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      {...register("state", { required: "State is required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      {...register("postalCode", { required: "Postal Code is required" })}
                      className={inputBaseStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      {...register("country", { required: "Country is required" })}
                      className={inputBaseStyles}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details Section */}
              <div className="space-y-6 pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Additional Details</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Extra information about the property.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Close Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        {...register("closePrice")}
                        className={`${inputBaseStyles} pl-8`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register("isLease")}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-gray-700">Available for Lease</label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <input
                    {...register("tags")}
                    placeholder="e.g. pool, garden, garage (comma-separated)"
                    className={inputBaseStyles}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-8">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm 
                           font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                           text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                           ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" 
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
