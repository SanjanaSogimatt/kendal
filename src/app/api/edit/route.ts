import dbConnect from "@/db/db";
import Listing from "@/schema/schema";
export async function POST(req: Request) {
    try {
        await dbConnect();
       
        const data = await req.json();
      
        if (!data.displayId) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Display ID and update data are required",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const updatedListing = await Listing.findOneAndUpdate({ displayId: data.displayId }, data, { new: true });
        
        if (!updatedListing) {
            return Response.json({
                success: false,
                message: "Listing not found"
            });
        } else {
            const allListings = await Listing.find();
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Listing updated successfully",
                    listings: allListings,
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
        
    } catch (error) {
        console.error('Error:', error);
        }
}