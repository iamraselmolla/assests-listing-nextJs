import { isUser } from "../../components/middleware/user";
import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function propertyHandling(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        isUser(req, res, async (req, res, next, decoded) => {
          await dbConnect();
          const { values } = req.body;
          let autoAdminVerified = false;
          if (decoded.role === "admin") {
            autoAdminVerified = true;
          }

          const result = new Property({ ...values });
          result.activity.accepted = autoAdminVerified;

          try {
            await result.save();
            return res.status(200).json({ message: "Property added" });
          } catch (err) {
            return res.status(500).json({
              message: "Error saving property",
              error: err.message,
            });
          }
        });
      } catch (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
    }
  }
}
