import dbConnect from "@/db/db";
import Listing from "@/schema/schema";
export async function POST(req: Request, res: Response) {
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
            return Response.json({
                success: true,
                message: "Listing found",
                data: updatedListing
            });
        }
        
    } catch (error) {
        console.error('Error:', error);
        }
}