import { hashPassGenerate } from "../../components/utils/bcrypt";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";

export default async function handleSingUp(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        await dbConnect();
        const { firstName, lastName, email, password } = req.body;
        const checkUserExist = await User.findOne({ email: email });
        if (checkUserExist) {
          return res.status(409).json({ message: "User already exists" });
        }
        const newValidEmail = email.toLowerCase();
        const securePass = await hashPassGenerate(password);
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: newValidEmail,
          password: securePass,
          role: 'user'
        });
        const result = await newUser.save();
        return res.status(200).json({ message: "User created successfully" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }
    }
  }
}
