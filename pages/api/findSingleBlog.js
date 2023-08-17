import dbConnect from "../../utils/dbConnect";
import Blog from "../../models/Blog";

export default async function getSingleBlog(req, res) {
    switch (req.method) {
        case "GET": {
            try {
                await dbConnect();
                const { id } = req.query
                if (id) {
                    const blog = await Blog.findById(id);
                    return res.status(200).json(blog);
                }

                return res.status(400).json({message: "Post not found"});
            } catch (err) {
                return res.status(500).json({ message: "Something Wrong" });
            }
        }
        default:
            return res.status(405).json({ message: "Method not allowed" });

    }
}