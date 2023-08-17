import React, { useEffect, useState } from 'react'
import ResponsiveDrawer from '../UI/ResponsiveDrawer';
import TopCard from '../UI/TopCard';
import Footer from '../UI/Footer';
import SplashScreen from '../SplashScreen';
import { Container } from '@mui/system';
import { getAllBlogs } from '../services/userServices';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../store/user-data-slice';
import Spinner from '../UI/Spinner';
import BlogCard from '../UI/BlogCard';

const BlogForUser = () => {
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [allBlogs, setAllBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {

            try {
                const response = await getAllBlogs()
                setAllBlogs(response?.data)
                setDataLoading(false)

            }
            catch (err) {
                toast.error(err)
                setDataLoading(false)
            }
        }
        fetchBlogs();
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => {
            clearTimeout(timer);
        }
    }, [])



    return (
        <div className='relative'>
            {loading ? <SplashScreen /> :
                <>
                    <ResponsiveDrawer />
                    <TopCard title='All Blogs' />
                    <div className='py-20 bg-white text-black '>
                        <Container>

                            {!dataLoading ? <>
                                {allBlogs?.length > 0 ? <>
                                    <div className="grid gap-5 grid-cols-1 md:grid-cols-3" >
                                       {allBlogs?.length > 0 && allBlogs?.map(blog  => <BlogCard
                                        img={blog?.img}
                                        title={blog?.title}
                                        description={blog?.description}
                                        category={blog?.category}
                                        createdAt={blog?.createdAt}
                                        id={blog?._id}
                                       />)}
                                    </div>
                                </> : <>
                                </>}
                            </> : <div className='flex justify-center items-center'>
                                <Spinner size={80} />
                            </div>}
                        </Container>

                    </div>

                    <Footer />
                </>
            }
        </div>
    )
}

export default BlogForUser