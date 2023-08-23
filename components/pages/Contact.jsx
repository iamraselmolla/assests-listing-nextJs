import React, { useEffect, useState } from 'react'
import ResponsiveDrawer from '../UI/ResponsiveDrawer';
import TopCard from '../UI/TopCard';
import Footer from '../UI/Footer';
import SplashScreen from '../SplashScreen';
import { Container } from '@mui/system';
import { Call, LocationOn, Mail } from '@mui/icons-material';
import { assets } from '../assets';
import Image from 'next/image';

import * as Yup from 'yup'
import { Form, Formik } from 'formik';
import InputField from '../UI/InputField';
import { useRouter } from 'next/router';
const Contact = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    const initialValues = {
        name: '',
        email: '',
        mobileNo: '',
        message: ''

    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        mobileNo: Yup.string().required('Required'),
        message: Yup.string().required('Required'),
    })

    const onSubmitHandler = (values, { resetForm }) => {
        let body = `Name=${values.name}%0D%0A Contact no=${values.mobileNo}%0D%0A Message=${values.message}`
        router.push(`mailto:warehouseservicez@gmail.com?subject=Contact&body=${body}`)
        resetForm({ values: "" });
    }


    return (
        <div className='relative'>
            {loading ? <SplashScreen /> :
                <>
                    <ResponsiveDrawer />
                    <TopCard title='CONTACT US' image={assets.contact} />
                    <div className='py-20 bg-white text-black '>
                        <Container>
                            <div className='grid grid-cols-1 md:grid-cols-3 md:min-h-[400px] grid-rows-3 md:grid-rows-1 min-h-[1100px] my-10 gap-10'>
                                <div className='transition-all group duration-300 hover:border-b-8 hover:border-b-primary bg-white border-gray-300 border rounded-xl py-6 sm:px-10 px-7 flex flex-col items-center gap-2'>
                                    <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-primary ">
                                        <LocationOn sx={{ fontSize: 80 }} className=' text-primary  group-hover:text-white' />
                                    </div>

                                    <h2 className='text-xl font-bold'>Office address</h2>
                                    <p className=' text-center'>Office address Kartikey Tower, 1st Floor , Nr.KVIC Housing Socity , Opposit Kali mandir Enclave , GMS Road , Dehradun</p>
                                </div>


                                <div className='transition-all group duration-300 hover:border-b-8 hover:border-b-primary items-center bg-white border-gray-300 py-6 sm:px-10 px-7 border rounded-xl  flex flex-col gap-2'>
                                    <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-primary">
                                        <Mail sx={{ fontSize: 80 }} className=' text-primary  group-hover:text-white' />
                                    </div>

                                    <h2 className='text-xl font-bold '>Mail us</h2>
                                    <p className=' text-center break-all'>warehouseservicez@gmail.com</p>
                                </div>


                                <div className=' transition-all group duration-300 hover:border-b-8 hover:border-b-primary items-center bg-white border border-gray-300 rounded-xl py-6 sm:px-10 px-7 flex flex-col gap-2'>
                                    <div className=" rounded-full  sm:p-6 p-4 w-fit bg-gray-200 group-hover:bg-primary">
                                        <Call sx={{ fontSize: 80 }} className=' text-primary group-hover:text-white' />
                                    </div>
                                    <h2 className='text-xl font-bold  '>Call Us</h2>
                                    <div className=' flex flex-col items-center'>
                                        <p>+91 9411712837</p>
                                        <p>+91 8191802837</p>
                                        <p>+91 7078789108</p>
                                        <p>+91 6396025448</p>
                                    </div>
                                </div>
                            </div>

                            <div className=' grid sm:grid-cols-2 gap-8  my-32'>
                                <div className=' p-8 rounded-xl border border-gray-300 shadow-lg'>
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
                                        <Form className='flex flex-col gap-4'>
                                            <div className='flex flex-col  gap-4 '>
                                                <p className=' text-center sm:text-4xl text-2xl'>Send us your feedback !</p>
                                                <InputField labelName='Full Name' uni='name' placeholder='Harish' />
                                                <InputField labelName='Mobile Number' uni='mobileNo' placeholder='9876543210' />
                                                <InputField labelName='Email' uni='Email' placeholder='sikka@gmail.com' />
                                                <InputField labelName='Message' uni='message' placeholder='Your message' />
                                            </div>
                                            <button type='submit' className='bg-primary py-2 sm:px-7 px-4 text-sm sm:text-base hover:bg-white hover:text-primary border border-primary rounded-md text-white  w-fit transition-all duration-300'>SUBMIT</button>

                                        </Form>
                                    </Formik>
                                </div>
                                <div className=' flex flex-col gap-6 justify-center'>
                                    <Image className=" bg-cover w-3/5 "
                                        alt="flipkart"
                                        src={assets.feedback_img} />
                                    <p className=' sm:text-4xl text-3xl font-semibold'>We Would Like Your Feedback To Improve Our Website</p>
                                    <p className=' text-primary sm:text-5xl text-4xl font-serif italic'>Please leave your feedback !</p>
                                </div>
                            </div>

                        </Container>
                        <div className="flex flex-col justify-center items-center bg-white text-black my-2">
                            <h4 className="text-4xl font-bold m-10 ">OUR LOCATION</h4>
                            <iframe
                                className="w-full h-[300px] md:h-[400px]" title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.2067707735296!2d78.0095323763292!3d30.31663590562165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092925e963de41%3A0xaa1fcaa43e5c52cb!2sWarehouse%20Servicez!5e0!3m2!1sen!2sin!4v1683894184725!5m2!1sen!2sin"
                            ></iframe>
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </div>
    )
}

export default Contact
