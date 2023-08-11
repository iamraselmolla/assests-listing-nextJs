import { isUser } from "../../components/middleware/user";
import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function getAllProperty(req, res) {
  switch (req.method) {
    case "GET": {
      try {
        isUser(req, res, async (req, res, next, decoded) => {
          await dbConnect();
          const { role, id } = decoded;
          if (decoded.role === "admin") {
            const getAllProperty = await Property.find({
              "activity.accepted": true,
            });
            res.status(200).json(getAllProperty);
          } else {
            const getAllProperty = await Property.find({ user: id });
            res.status(200).json(getAllProperty);
          }
        });
      } catch (err) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  }
}
