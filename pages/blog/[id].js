import { useRouter } from "next/router";
import SplashScreen from "../../components/SplashScreen";
import ResponsiveDrawer from "../../components/UI/ResponsiveDrawer";
import { Container } from '@mui/system';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TopCard from "../../components/UI/TopCard";
import Footer from "../../components/UI/Footer";


const Page = () => {

    const router = useRouter();
    const { id } = router.query;
    const  {blogs}  = useSelector(state => state.userData);
   
    const [singleBlog, setSingleBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => {
            clearTimeout(timer);
        }
    }, []);
    useEffect(() => {
        if (id) {
            const findPost = blogs?.filter(blog => blog._id === id);
            
            setSingleBlog(findPost)
        }
    }, [id]);
    console.log(singleBlog)

    return (

        <div className='relative'>
            {loading ? <SplashScreen /> :
                <>
                    <ResponsiveDrawer />
                    <TopCard title='All Blogs' />
                    <div className='py-20 bg-white text-black '>
                        <Container>


                        </Container>

                    </div>

                    <Footer />
                </>
            }
        </div>
    )

}
export default Page;