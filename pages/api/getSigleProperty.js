import Property from "../../models/Property";
import dbConnect from "../../utils/dbConnect";

export default async function getPropertyById(req, res) {
  switch (req.method) {
    case "GET": {
      try {
        await dbConnect();
        const { id } = req.query;

        if (id) {
          const result = await Property.findById(id);
          return res.status(200).json(result);
        }
        return res.status(401).json({ message: "Wrong password" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }
    }
  }
}
