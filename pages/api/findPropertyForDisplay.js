import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function getAllPropertyForAllUser(req, res) {
  switch (req.method) {
    case "GET": {
      try {
        await dbConnect();
        const properties = await Property.find({
          $and: [{ "activity.active": true }, { "activity.accepted": true }],
        });
        return res.status(200).json(properties);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }
    }
  }
}
