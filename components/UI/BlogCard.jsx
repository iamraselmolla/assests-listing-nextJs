import { ArrowForward, CalendarMonth } from "@mui/icons-material";
import Link from "next/link";


const BlogCard = ({img, title,id, description, category, createdAt}) => {


    return (
        <>
            <div className='border-2 relative py-5 rounded-md'>
                <div className="blog-content pb-16 px-4">
                    {img && <img src={img} alt={`${title}`} />}
                    <div className="text-red-500  mb-4 font-bold">
                        {category}
                    </div>
                    <h1 className="blog_title mb-3 text-2xl font-extrabold">
                        {title}
                    </h1>
                    <div className="flex mb-3">
                        <CalendarMonth /> {new Date(createdAt).toLocaleDateString()}
                    </div>
                    <p className="text-slate-500">
                        {description.split('').slice(0, 100).join('') + "..."}
                    </p>
                </div>
                <div className="blog-footer pr-4 absolute w-full bottom-1 text-right mt-5 border-t py-4">
                    <Link href={`/blog/${id}`} className='text-orange-500'>
                        Read More <ArrowForward />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BlogCard;