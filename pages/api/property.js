import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function propertyHandling(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        await dbConnect();
        const { values } = req.body;
        const result = await Property({ ...values });
        if (result) {
          await result.save();
          return res.status(200).json({ message: "Property added" });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
    }
  }
}
