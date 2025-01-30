// pages/api/listings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import {NextResponse} from 'next/server';
import dbConnect from '@/db/db';
import Listing from '@/schema/schema';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const listings = await Listing.find({}); 
            
            return NextResponse.json({
                listings:listings
            });
        } catch (error) {
            return NextResponse.json({ error: 'Error fetching listings' });
        }
    } else {
        return NextResponse.json({ error: 'Method Not Allowed' });
    }
};


