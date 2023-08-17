import { useRouter } from "next/router";
import SplashScreen from "../../components/SplashScreen";
import ResponsiveDrawer from "../../components/UI/ResponsiveDrawer";
import { Container } from '@mui/system';
import { useEffect, useState } from "react";
import TopCard from "../../components/UI/TopCard";
import Footer from "../../components/UI/Footer";
import { getASingleBlogPost, getAllBlogs } from "../../components/services/userServices";
import { toast } from "react-toastify";
import Spinner from "../../components/UI/Spinner";
import Link from "next/link";
import { ImageNotSupported } from "@mui/icons-material";

const PostDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [singleBlog, setSingleBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(true);
    const [allBlogs, setAllBlogs] = useState(null)
    const [fetchingAllBlogs, setFetchingAllBlogs] = useState(true)

    useEffect(() => {
        const fetchSinglePost = async () => {
            if (id) {
                const result = await getASingleBlogPost(id);
                if (result.status === 200) {
                    setButtonLoading(false);
                    setSingleBlog(result?.data);

                    const response = await getAllBlogs();
                    if (response.status === 200) {
                        setAllBlogs(response?.data)
                        setFetchingAllBlogs(false)
                    }

                } else {
                    setButtonLoading(false);
                    setFetchingAllBlogs(false)
                    toast.error(result?.data.message);
                }
            }
        };

        if (id) {
            fetchSinglePost();
        }
    }, [id]);
    useEffect(() => {

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className='relative'>
            {loading ? (
                <SplashScreen />
            ) : (
                <>
                    <ResponsiveDrawer />
                    <TopCard title={`${singleBlog?.title}`} />
                    <div className='py-20 bg-white text-black '>
                        <Container>
                            {!buttonLoading ? (
                                <div className="grid md:grid-cols-3 grid-cols-1">
                                    <div className="col-span-1 md:col-span-2">
                                        {singleBlog?.img && (
                                            <img className="mb-4" src={`${singleBlog?.img}`} alt="Image" />
                                        )}
                                        <div className="category col-span-2 bg-orange-300 text-white font-bold uppercase inline-block  px-3 py-2">
                                            {singleBlog?.category}
                                        </div>
                                        <h1 className="text-3xl mt-5 font-bold">
                                            {singleBlog?.title}
                                        </h1>
                                        <p className="text-slate-400 text-lg mt-4">
                                            {singleBlog?.description}
                                        </p>
                                    </div>
                                    <div className="col-span-1 px-5 md:col-span-1">
                                        <h2 className="text-2xl font-bold mb-5">
                                            All blogs ({allBlogs && allBlogs?.length})
                                        </h2>
                                        {!fetchingAllBlogs ?
                                            <>
                                                {allBlogs && allBlogs?.length > 0 && <>
                                                    {allBlogs?.map(blog => (
                                                        <Link href={`/blog/${blog?._id}`}>

                                                            <div className="flex gap-3 mb-4 items-center">
                                                                <div>{blog?.img ? <img className="w-12" src={`${blog?.img}`} /> : <div className="bg-green-300 text-white w-12 h-12 flex justify-center items-center rounded-full"><ImageNotSupported/> </div>}</div>
                                                                <div>

                                                                    <h3 className="font-bold">
                                                                        {blog?.title}
                                                                    </h3>
                                                                    <p>{singleBlog?.description.split('').slice(0, 40).join('')}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </>}</> : <div className="flex items-center justify-center">
                                                <Spinner size={20} />
                                            </div>}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Spinner size={60} />
                                </div>
                            )}
                        </Container>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default PostDetails;
