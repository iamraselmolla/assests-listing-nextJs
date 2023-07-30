import React, { useEffect, useState } from "react";
import Footer from "../UI/Footer";
import SplashScreen from '../SplashScreen';
import Image from "next/image";
import { assets } from "../assets";
import DoneIcon from "@mui/icons-material/Done";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ResponsiveDrawer from '../UI/ResponsiveDrawer';
import TopCard from '../UI/TopCard';
import { Container } from '@mui/system';
            
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
                        <div className=" flex flex-col lg:w-[1124px] m-auto gap-20">

                            <div className=" flex-col flex gap-6">
                                <p className=" text-3xl font-semibold">Our Mission</p>
                                <div className=" grid grid-cols-[2fr_1.5fr] gap-4">
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
                                    <div className=" grid grid-cols-1">
                                        <Image
                                            className="col-span-1 bg-cover h-[60%] w-[100%]"
                                            alt="About us"
                                            src={assets.about_us_1}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-col gap-2">
                                <p className=" text-center  text-3xl font-semibold">Some of the key features</p>
                                <p className=" text-center">Sikka and Associates rent and lease space for commercial properties include</p>
                                <div className=" grid grid-cols-3 text-center gap-6">
                                    <div className=" flex flex-col items-center gap-4  rounded-lg px-10 py-12 border border-gray-200">
                                        <div className=" rounded-full  p-6  w-fit bg-gray-200 ">
                                            <DoneIcon sx={{ fontSize: 80, color: 'rgb(234,88,12)' }} />
                                        </div>
                                        <p className=" font-semibold">Flexible leasing options</p>
                                        <p>We offer flexible leasing options to meet your unique
                                            business needs, including short-term and long-term leases.</p>
                                    </div>
                                    <div className=" flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-10 py-12 ">
                                        <div className=" rounded-full  p-6 w-fit bg-gray-200">
                                            <AttachMoneyIcon sx={{ fontSize: 80, color: 'rgb(234,88,12)' }} />
                                        </div>
                                        <p className=" font-semibold">Competitive Pricing</p>
                                        <p>Our rental and leasing rates are highly competitive and tailored to meet your specific budget and requirements.</p>
                                    </div>
                                    <div className=" flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-10 py-12 ">
                                        <div className=" rounded-full  p-6  w-fit bg-gray-200">
                                            <LocationOnIcon sx={{ fontSize: 80, color: 'rgb(234,88,12)' }} />
                                        </div>
                                        <p className=" font-semibold">Location and Accessibility</p>
                                        <p>Our properties are located in prime commercial areas that are easily accessible by public transport and major highways</p>
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-col gap-2">
                                <p className=" text-center  text-3xl font-semibold">Why Choose Us</p>
                                <p className=" text-center">We provide full service at every step</p>
                                <div className=" grid grid-cols-3 text-center gap-6">
                                    <div className=" flex flex-col items-center gap-4  rounded-lg px-10 py-12 border border-gray-200">
                                        <div className=" rounded-full  p-6  w-fit bg-gray-200 ">
                                            <DoneIcon sx={{ fontSize: 80, color: 'rgb(234,88,12)' }} />
                                        </div>
                                        <p className=" font-semibold">Wide Range of properties</p>
                                        <p>Sikka &amp; Associates offers a wide range of commercial properties that are available for
                                            rent/lease. This means that you can choose from various types of properties that suit your specific business needs.</p>
                                    </div>
                                    <div className=" flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-10 py-12 ">
                                        <div className=" rounded-full  p-6 w-fit bg-gray-200">
                                            <MapsHomeWorkIcon sx={{ fontSize: 80, color: 'rgb(234,88,12)' }} />
                                        </div>
                                        <p className=" font-semibold">Expertise</p>
                                        <p>The team at Sikka &amp; Associates has extensive experience in the commercial real estate industry. They have a deep
                                            understanding of the market and can provide valuable insights into the best properties and locations.</p>
                                    </div>
                                    <div className=" flex flex-col items-center gap-4 border-gray-200 border rounded-lg px-10 py-12 ">
                                        <div className=" rounded-full  p-6  w-fit bg-gray-200">
                                            <LocationOnIcon sx={{ fontSize: 80, color: 'rgb(234,88,12)' }} />
                                        </div>
                                        <p className=" font-semibold">Transparency</p>
                                        <p>At Sikka &amp; Associates, we believe in transparency in all our dealings. You can be assured of complete transparency
                                            in the rental/lease process, including lease terms, pricing, and any other relevant information.</p>
                                    </div>
                                </div>
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
