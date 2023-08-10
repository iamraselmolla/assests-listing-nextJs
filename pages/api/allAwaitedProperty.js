import { isAdmin } from "../../components/middleware/user";
import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function getWaitingProperties(req, res) {
  switch (req.method) {
    case "GET": {
      try {
        isAdmin(req, res, async (req, res, next, decoded) => {
          await dbConnect();
          const properties = await Property.find({
            "activity.accepted": false,
          });
          return res.status(200).json(properties);
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }
    }
  }
}
