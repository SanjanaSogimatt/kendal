
import {NextResponse} from 'next/server';
import dbConnect from '@/db/db';
import Listing from '@/schema/schema';

export async function GET(req: Request) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const listings = await Listing.find({}); 
            
            return NextResponse.json({
                listings:listings
            });
        } catch (error) {
            return NextResponse.json({ message: 'Error fetching listings',error});
        }
    } else {
        return NextResponse.json({ error: 'Method Not Allowed' });
    }
};


