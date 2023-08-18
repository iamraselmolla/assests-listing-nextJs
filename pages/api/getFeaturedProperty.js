import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function getAllProperty(req, res) {
    switch (req.method) {
        case "GET": {
            try {
                await dbConnect();
                const getAllProperty = await Property.find({
                    "activity.featured": true,
                }).limit(6);
                res.status(200).json(getAllProperty);


            } catch (err) {
                return res.status(500).json({ message: "Server error" });
            }
        }
    }
}
