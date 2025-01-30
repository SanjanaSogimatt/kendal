import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
    
    const { state, city, streetName, streetNumber, postalCode } = await req.json();
    // Construct the full address
    const address = `${streetNumber} ${streetName}, ${city}, ${state}, ${postalCode}`;

    // MapTiler API endpoint for geocoding
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=nMGXPuRsVZYF8JJLSsha`;

    try {
        // Send request to MapTiler API
        const response = await axios.get(url);
        
        // Extract the first result's coordinates (if available)
        const features = response.data.features;
        if (features && features.length > 0) {
            const { geometry } = features[0]; // Get geometry from the first feature
            const { coordinates } = geometry; // Get the coordinates

            // Return the coordinates as a response
            return NextResponse.json({
                latitude: coordinates[1],
                longitude: coordinates[0],
            });
        } else {
            // No results found
            return NextResponse.json({ error: 'Invalid address or no results found.' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error fetching geocoding data:', error);
        return NextResponse.json({ error: 'Failed to fetch coordinates.' });
    }
}
