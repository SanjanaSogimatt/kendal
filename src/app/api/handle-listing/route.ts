import dbConnect from '@/db/db';
import Listing from '@/schema/schema';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

const photos = [
    'https://mediaservice.themls.com/large/25-488121/25-488121_961eed84-5ae9-41ab-921b-85632fb66d5a.jpg',
    'https://mediaservice.themls.com/large/25-488121/25-488121_baf7fe1a-88b0-427c-8b67-c5a82287c155.jpg',
    'https://mediaservice.themls.com/large/25-488121/25-488121_9e2dbe36-9c82-4f24-85e2-3eece0701d49.jpg',
    'https://mediaservice.themls.com/large/25-488121/25-488121_175cbe9a-ddfa-4d76-aa5e-7f59bb991958.jpg',
    'https://mediaservice.themls.com/large/25-488121/25-488121_aa9147d1-2729-4aec-97e0-1d98c95b9a53.jpg'
];

export async function POST(req: Request, res: NextApiResponse) {
    await dbConnect();
    const data = await req.json();

    const { propertyType, longitude, latitude, listPrice, acreage, bathroomsTotal, bedroomsTotal, livingArea, city, country, postalCode, state, streetName, streetNumber, closePrice, isLease, tags } = data;

    // Get long and lat
    try {
        if (!latitude || !longitude) {
            return Response.json({ error: 'Invalid address' });
        }

        const displayId = uuidv4();
        const listingId = uuidv4();
        const unparsedAddress = `${streetNumber} ${streetName}, ${city}, ${state}, ${postalCode}`;

        // Generate a random number to pick a random photo
        const randomIndex = Math.floor(Math.random() * photos.length);
        const selectedPhoto = photos[randomIndex]; // Pick a random photo URL

        const listing = new Listing({
            displayId: displayId,
            latitude: latitude,
            longitude: longitude,
            propertyType: propertyType,
            listPrice: listPrice,
            closePrice: closePrice,
            isLease: isLease,
            acreage: acreage,
            bathroomsTotal: bathroomsTotal,
            bedroomsTotal: bedroomsTotal,
            livingArea: livingArea,
            unparsedAddress: unparsedAddress,
            city: city,
            photo: [selectedPhoto],  // Add the selected photo to the photo array
            country: country,
            listingId: listingId,
            postalCode: postalCode,
            state: state,
            streetName: streetName,
            streetNumber: streetNumber,
            tags: tags,
        });

        const saved = await listing.save();

        if (saved) {
            return Response.json({
                success: true,
                message: "Listing added successfully",
                displayId: displayId
            }, { status: 200 });
        } else {
            return Response.json({
                error: 'Failed to add listing'
            }, { status: 500 });
        }

    } catch (e) {
        console.error('Error:', e);
        return Response.json({
            error: 'Failed to add listing'
        }, { status: 500 });
    }
}
