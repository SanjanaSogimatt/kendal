'use client';
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";

type Listing = {
    id: string;
    propertyType: string;
    listPrice: number;
    unparsedAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    bedroomsTotal: number;
    bathroomsTotal: number;
    acreage: number;
    photos: { photoUrl: string }[];
};

const Page = () => {
    const { id } = useParams(); // Get the 'id' from the URL
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/fetch-data/?id=${id}`);
                console.log('Response:', response.data);
                if (response) {
                    setListing(response.data.listing);
                } else {
                    setError('Listing not found.');
                }
            } catch (err) {
                console.log(err);
                console.error('Error fetching listing:', err);
                setError('An error occurred while fetching the listing.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchListingData();
        }
    }, [id]);  // Effect depends on 'id'

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Listing Details</h1>

            {listing && (
                <div className="card w-full max-w-4xl bg-base-100 shadow-lg p-6 mx-auto">
                    <div className="card-body">
                        <h2 className="card-title text-xl font-semibold mb-4">Property Details</h2>
                        <Link href="/" className="text-blue-500 underline">
                            Back home
                        </Link>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <Image src={listing.photos[0] && listing.photos[0].photoUrl} alt="" width={500} height={300} />
                                </div>
                                <p><strong className="font-semibold">Property Type:</strong> {listing.propertyType}</p>
                                <p><strong className="font-semibold">Price:</strong> ${listing.listPrice}</p>
                                <p><strong className="font-semibold">Address:</strong> {listing.unparsedAddress}</p>
                                <p><strong className="font-semibold">City:</strong> {listing.city}</p>
                                <p><strong className="font-semibold">State:</strong> {listing.state}</p>
                                <p><strong className="font-semibold">Country:</strong> {listing.country}</p>
                                <p><strong className="font-semibold">Postal Code:</strong> {listing.postalCode}</p>
                            </div>

                            <div>
                                <p><strong className="font-semibold">Bedrooms:</strong> {listing.bedroomsTotal}</p>
                                <p><strong className="font-semibold">Bathrooms:</strong> {listing.bathroomsTotal}</p>
                                <p><strong className="font-semibold">Acreage:</strong> {listing.acreage} acres</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
