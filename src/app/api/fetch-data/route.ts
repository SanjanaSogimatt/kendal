import Listing from "@/schema/schema";
import dbConnect from "@/db/db";

export async function GET(req: Request)
{

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id');
        const foundListing = await Listing.findOne({ displayId: id });
       
        if (!foundListing) {
            return Response.json({ error: 'Listing not found' });
        } else {
            return Response.json({
                listing: foundListing
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Error fetching listing' });
        
    }
}