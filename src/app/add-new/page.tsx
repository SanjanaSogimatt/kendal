'use client'
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

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
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const router = useRouter();
   
    interface FormData {
        propertyType: string;
        listPrice: number;
        bathroomsTotal: string;
        bedroomTotal: string;
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
        tags?: string;
    }

    interface CoordResponseData {
        longitude: number;
        latitude: number;
        error?: string;
    }

    interface ListingResponseData {
        displayId: string;
        error?: string;
    }

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Getting longitude and latitude');
            const coordResponse = await axios.post<CoordResponseData>('/api/get-coord', data);
            
            if (coordResponse.data.error) {
                throw new Error(coordResponse.data.error);
            }

            const { longitude, latitude } = coordResponse.data;
            console.log('Posting listing');
            const listingData = { ...data, longitude, latitude };
            
            const listingResponse = await axios.post<ListingResponseData>('/api/handle-listing', listingData);
            console.log('Response from handle listing:', listingResponse.data);
            
            if (listingResponse.data.error) {
                throw new Error(listingResponse.data.error);
            }
            
            router.push(`/listing/${listingResponse.data.displayId}`);
        } catch (error) {
            console.error('Error in onSubmit:', error);
            throw error;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-8 py-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Add New Listing</h1>
                            <button
                                onClick={() => router.push("/")}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 
                                         bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                            >
                                ← Back
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                        {/* Main Details Section */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900">Main Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Property Type */}
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
                                    {errors.propertyType && (
                                        <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
                                    )}
                                </div>

                                {/* List Price */}
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
                                    {errors.listPrice && (
                                        <p className="mt-1 text-sm text-red-600">{errors.listPrice.message}</p>
                                    )}
                                </div>

                                {/* Bedrooms */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bedrooms
                                    </label>
                                    <input
                                        type="number"
                                        {...register("bedroomTotal", { required: "Number of bedrooms is required" })}
                                        className={inputBaseStyles}
                                    />
                                    {errors.bedroomTotal && (
                                        <p className="mt-1 text-sm text-red-600">{errors.bedroomTotal.message}</p>
                                    )}
                                </div>

                                {/* Bathrooms */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bathrooms
                                    </label>
                                    <input
                                        type="number"
                                        {...register("bathroomsTotal", { required: "Number of bathrooms is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* Living Area */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Living Area (sqft)
                                    </label>
                                    <input
                                        type="number"
                                        {...register("livingArea", { required: "Living area is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* Acreage */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Acreage
                                    </label>
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
                        <div className="space-y-6 pt-6">
                            <h2 className="text-lg font-semibold text-gray-900">Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Street Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Number
                                    </label>
                                    <input
                                        {...register("streetNumber", { required: "Street number is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* Street Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Name
                                    </label>
                                    <input
                                        {...register("streetName", { required: "Street name is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        {...register("city", { required: "City is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State
                                    </label>
                                    <input
                                        {...register("state", { required: "State is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* Postal Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Postal Code
                                    </label>
                                    <input
                                        {...register("postalCode", { required: "Postal code is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <input
                                        {...register("country", { required: "Country is required" })}
                                        className={inputBaseStyles}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-6 pt-6">
                            <h2 className="text-lg font-semibold text-gray-900">Additional Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Close Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Close Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            {...register("closePrice")}
                                            className={`${inputBaseStyles} pl-8`}
                                        />
                                    </div>
                                </div>

                                {/* Is Lease */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        {...register("isLease")}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        Available for Lease
                                    </label>
                                </div>

                                {/* Tags */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags
                                    </label>
                                    <input
                                        {...register("tags")}
                                        placeholder="e.g. pool, garden, garage (comma-separated)"
                                        className={inputBaseStyles}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium 
                                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                       focus:ring-offset-2 transition-all duration-200
                                       ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating...
                                    </span>
                                ) : (
                                    'Create Listing'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ListingForm;
