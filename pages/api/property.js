import { isAdmin, isUser } from "../../components/middleware/user";
import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function propertyHandling(req, res) {
  switch (req.method) {
    case "POST":
      {
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
      break;
    case "PUT":
      try {
        await dbConnect();
        isAdmin(req, res, async (req, res, next, decoded) => {
          console.log(req.body);

          const { values, action } = req.body;
          const getProperty = await Property.findById(values);

          getProperty.activity[action] = !getProperty.activity[action];
          const result = await getProperty.save();
          console.log(result);
          // const doUpdate = await Property.findByIdAndUpdate(values, { {`activity.${action}`}: !`activity.${action}` });
          return res.status(200).json({ message: "Property updated" });
        });
      } catch (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
      break;
    case "DELETE":
      try {
        await dbConnect();
        isAdmin(req, res, async (req, res, next, decoded) => {
          const { id } = req.query;
          if (id) {
            const result = await Property.findByIdAndDelete(id);
            if (result) {
              return res.status(200).json({ message: "Deleted Successfully" });
            }
          }
        });
      } catch (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
