import dbConnect from "../../utils/dbConnect";
import { isAdmin } from "../../components/middleware/user";
import Blog from "../../models/Blog";

export default async function addBlogBYAdmin(req, res) {
    switch (req.method) {
        case "POST":
            {
                try {
                    await dbConnect();
                    isAdmin(req, res, async (req, res, next, decoded) => {
                        const data = req.body
                        const saveBlog = new Blog({
                            ...data
                        });

                        const result = await saveBlog.save();
                        return res.status(200).json({ message: "Blog added successfully" });
                    })
                } catch (err) {
                    return res.status(500).json({ message: "Something Wrong" });
                }
            }
    }
}