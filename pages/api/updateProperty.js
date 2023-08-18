import { isAdmin } from "../../components/middleware/user";
import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function propertyHandling(req, res) {
    switch (req.method) {
        case "PUT":
            try {
                await dbConnect();
                const { owner, property, id } = req.body;
                isAdmin(req, res, async (req, res, next, decoded) => {


                    const doUpdate = await Property.findByIdAndUpdate(id, {
                        owner: owner,
                        property: property
                    }, {
                        new: true,
                    });
                    return res.status(201).json({ message: "Property updated" });
                });
            } catch (err) {
                return res.status(500).json({
                    message: "Something went wrong",
                    error: err.message,
                });
            }
            break;
        default:
            return res.status(405).json({ message: "API not found" });
    }
}
