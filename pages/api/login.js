import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import {
  compareHashPass,
  hashPassGenerate,
} from "../../components/utils/bcrypt";
export default async function handler(req, res) {
  const secretKey =
    "f4c1e7001409121f1db8aa18f8dc841c4a861fb03e116717abb1ef95b5f4cd609046109907876726261eeb21b4dcd57a0b97849fb090abb74e2c10e1";

  switch (req.method) {
    case "POST": {
      try {
        let { email, password } = req.body;
        await dbConnect();
        email = email.toLowerCase();
        const userExist = await User.findOne({ email });
        if (!userExist)
          return res.status(404).json({ message: "User not found" });
        const checkandComparePass = await compareHashPass(
          password,
          userExist?.password
        );

        if (checkandComparePass) {
          const jwtData = {
            role: userExist?.role,
            id: userExist?._id,
          };
          const token = jwt.sign(jwtData, secretKey);
          return res.status(200).json({
            message: "Logged in Successfully",
            user: { token, id: userExist._id, role: userExist?.role },
            userInfo: userExist,
          });
        }

        return res.status(401).json({ message: "Wrong password" });
      } catch (err) {
        return res.status(500).json({ message: "Server error" });
      }
      break;
    }

    default:
      return res.status(500).json({ message: "API NOT FOUND" });
  }
}
