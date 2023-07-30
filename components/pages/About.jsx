import React, { useEffect, useState } from "react";
import Footer from "../UI/Footer";
import SplashScreen from '../SplashScreen';
import Image from "next/image";
import { assets } from "../assets";
import DoneIcon from "@mui/icons-material/Done";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ResponsiveDrawer from '../UI/ResponsiveDrawer';
import TopCard from '../UI/TopCard';
import { Container } from '@mui/system';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "../../node_modules/swiper/modules/pagination.css";
import "../../node_modules/swiper/modules/navigation.css";
import "../../node_modules/swiper/swiper.css";


// import required modules
import { Navigation, Pagination,Keyboard,Autoplay } from 'swiper/modules';
const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="relative">
            {loading ? (
                <SplashScreen />
            ) : (
                <>
                    <ResponsiveDrawer />
                    <TopCard title='About Us' />
                    <Container>
                        <div className=" flex flex-col  m-auto gap-20 py-16">

                            <div className=" flex-col flex gap-6">
                                <p className=" text-3xl font-semibold">Our Mission</p>
                                <div className=" grid md:grid-cols-[2fr_1.5fr] sm:gap-4 gap-8">
                                    <div className=" flex flex-col gap-7 [word-spacing:5px]">
                                        <p>To provide our clients with high-quality commercial properties that meet their
                                            specific needs and requirements.be a trusted partner for businesses looking for
                                            commercial property on rent/lease by offering professional and personalized services
                                            strive for excellence in all aspects of our business, from property selection and leasing
                                            to customer service and maintenance.<br />create long-term relationships with our clients by providing
                                            them with outstanding value and unparalleled service stay up-to-date with the latest trends and developments
                                            in the commercial property market to ensure that we can offer our clients the best options available.</p>
                                        <p>Foster a culture of innovation and creativity within our organization to continually improve our services and
                                            exceed our clients’ expectationsact with integrity, honesty, and transparency in all of our dealings with our clients, partners, and stakeholders.</p>
                                        <p>Make a positive impact on the communities in which we operate by promoting sustainable development and responsible business practices be a leader in
                                            the commercial property industry by setting high standards for ourselves and inspiring others to follow our example always put our clients first and work
                                            tirelessly to help them achieve their goals and succeed in their businesses.</p>
                                    </div>
                                    <div className=" h-fit sm:h-auto">
                                        <Image
                                            className=" bg-cover h-[60%] w-[80%] sm:w-[100%] m-auto"
                                            alt="About us"
                                            src={assets.about_us_1}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-col gap-2">
                                <p className=" text-center  text-3xl font-semibold">Some of the key features</p>
                                <p className=" text-center">Sikka and Associates rent and lease space for commercial properties include</p>
                                <div className=" grid lg:grid-cols-3 text-center gap-6 sm:grid-cols-2">
                                    <div className="  transition-all group duration-300 hover:border-b-8 hover:border-b-orange-600 flex flex-col items-center gap-4  rounded-lg sm:px-10 py-12 px-6 border border-gray-200">
                                        <div className=" rounded-full  sm:p-6 p-4 bg-gray-200  w-fit group-hover:bg-orange-600  ">
                                            <DoneIcon sx={{ fontSize: 80  }} className=" text-orange-600 group-hover:text-white"/>
                                        </div> 
                                        <p className=" font-semibold">Flexible leasing options</p>
                                        <p>We offer flexible leasing options to meet your unique
                                            business needs, including short-term and long-term leases.</p>
                                    </div>
                                    <div className="transition-all duration-300 group hover:border-b-8 hover:border-b-orange-600 flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-6 sm:px-10 py-12 ">
                                        <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-orange-600">
                                            <AttachMoneyIcon sx={{ fontSize: 80 }} className=" text-orange-600 group-hover:text-white"/>
                                        </div>
                                        <p className=" font-semibold">Competitive Pricing</p>
                                        <p>Our rental and leasing rates are highly competitive and tailored to meet your specific budget and requirements.</p>
                                    </div>
                                    <div className="transition-all duration-300 group hover:border-b-8 hover:border-b-orange-600 flex flex-col items-center gap-4 border-gray-200 border rounded-lg sm:px-10 px-6 py-12 ">
                                        <div className=" rounded-full  sm:p-6 p-4  w-fit bg-gray-200 group-hover:bg-orange-600">
                                            <LocationOnIcon sx={{ fontSize: 80 }} className=" text-orange-600 group-hover:text-white"/>
                                        </div>
                                        <p className=" font-semibold">Location and Accessibility</p>
                                        <p>Our properties are located in prime commercial areas that are easily accessible by public transport and major highways</p>
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-col gap-2">
                                <p className=" text-center  text-3xl font-semibold">Why Choose Us</p>
                                <p className=" text-center">We provide full service at every step</p>
                                <div className=" grid lg:grid-cols-3 text-center gap-6 sm:grid-cols-2">
                                    <div className="transition-all duration-300 group hover:border-b-8 hover:border-b-orange-600 flex flex-col items-center gap-4  rounded-lg sm:px-10 px-6 py-12 border border-gray-200">
                                        <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-orange-600">
                                            <AccessibilityNewIcon sx={{ fontSize: 80 }} className=" text-orange-600 group-hover:text-white" />
                                        </div>
                                        <p className=" font-semibold">Wide Range of properties</p>
                                        <p>Sikka &amp; Associates offers a wide range of commercial properties that are available for
                                            rent/lease. This means that you can choose from various types of properties that suit your specific business needs.</p>
                                    </div>
                                    <div className="transition-all group duration-300 hover:border-b-8 hover:border-b-orange-600 flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-6 sm:px-10 py-12 ">
                                        <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-orange-600">
                                            <MapsHomeWorkIcon sx={{ fontSize: 80 }} className=" text-orange-600 group-hover:text-white"/>
                                        </div>
                                        <p className=" font-semibold">Expertise</p>
                                        <p>The team at Sikka &amp; Associates has extensive experience in the commercial real estate industry. They have a deep
                                            understanding of the market and can provide valuable insights into the best properties and locations.</p>
                                    </div>
                                    <div className="transition-all group duration-300 hover:border-b-8 hover:border-b-orange-600 flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-6 sm:px-10 py-12 ">
                                        <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-orange-600">
                                            <AccountBalanceWalletIcon sx={{ fontSize: 80 }} className=" text-orange-600 group-hover:text-white"/>
                                        </div>
                                        <p className=" font-semibold">Transparency</p>
                                        <p>At Sikka &amp; Associates, we believe in transparency in all our dealings. You can be assured of complete transparency
                                            in the rental/lease process, including lease terms, pricing, and any other relevant information.</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" px-6 gap-4">
                                <p className=" text-3xl font-semibold text-center mb-6">We Serve</p>
                                <p className=" text-center mb-6">We are committed to serving our partners with excellence and dedication.</p>
                                <Swiper
                                    autoplay={{delay:5000}}
                                    cssMode={true}
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    keyboard={true}
                                    navigation={true}
                                    pagination={true}
                                    modules={[Navigation, Pagination,Keyboard,Autoplay]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <Image className=" bg-cover w-1/2 m-auto mb-10"
                                            alt="flipkart"
                                            src={assets.flipkart} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.Bata} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.Bihani} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.bykes} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.Citroen} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.Delhivery} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.HDFC} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.IDP} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.logo_1_removebg_preview} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.NU} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.Ola} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.Renest} />
                                    </SwiperSlide>
                                    <SwiperSlide><Image className=" bg-cover w-1/2 m-auto"
                                        alt="flipkart"
                                        src={assets.V_MART} />
                                    </SwiperSlide>
                                </Swiper>
                            </div>

                        </div>
                    </Container>


                    <Footer />

                </>
            )}
        </div>
    );
}

export default About
