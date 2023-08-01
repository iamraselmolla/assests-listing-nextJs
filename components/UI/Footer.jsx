import React from 'react'
import { IconButton } from "@mui/material";
import { Call, Email, Facebook, Instagram, LocationOn, Twitter, WhatsApp } from "@mui/icons-material";
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer id='footer' className=' flex flex-col' style={{ wordBreak: 'break-word' }}>
            <div className='fixed bottom-0 right-0 flex justify-end z-10 '>
                <a rel="noreferrer" target='_blank' href={`https://wa.me/+918191802837`} className='font-bold bg-green-500 w-16 h-16 dark:mb-10 m-4 rounded-full flex justify-center items-center'>
                    <WhatsApp sx={{ color: 'white' }} fontSize='large' />
                </a>
            </div>
            <div className=' grid md:grid-cols-3  '>
                <div className=' flex flex-col md:bg-slate-950 bg-slate-900 md:py-16 md:pl-12 lg:pl-20  md:pr-1 px-3  py-6 pt-16   gap-6'>
                    <p className='text-gray-300'>Pellentesque habitant morbi tristique senetus et netus et
                        malesuada fames ac turpis . tortor quam, feugiat vitae.</p>
                    <div className=' flex gap-4 flex-wrap'>
                        <div className=' bg-slate-800 hover:bg-primary h-fit rounded-full'>
                            <IconButton onClick={() => { window.open("https://www.facebook.com/warehouseservicez", "_blank") }}><Facebook sx={{ color: 'white', fontSize: 20 }} /></IconButton>
                        </div>
                        <div className=' bg-slate-800 hover:bg-primary h-fit rounded-full'>
                            <IconButton onClick={() => { window.open("https://twitter.com/warehouseservi3", "_blank") }}><Twitter sx={{ color: 'white', fontSize: 20 }} /></IconButton>
                        </div>
                        <div className=' bg-slate-800 hover:bg-primary h-fit rounded-full'>
                            <IconButton onClick={() => { window.open("https://instagram.com/warehouse.services?igshid=NTc4MTIwNjQ2YQ==", "_blank") }}><Instagram sx={{ color: 'white', fontSize: 20 }} /></IconButton>
                        </div>
                    </div>
                </div>

                <div className=' flex flex-col gap-4 bg-slate-900 md:py-16 py-6  md:px-6 px-3'>
                    <p className=' text-white font-bold'>Get in touch</p>
                    <div className=' flex gap-1'>
                        <LocationOn sx={{ color: '#E38B29', fontSize: 20 }} />
                        <p className=' text-sm text-gray-400'>
                            Kartikey Tower,1st Floor , Nr. KVIC Housing Society ,Opposite Kali Mandir
                            Enclave , GMS Road , Dehradun</p>
                    </div>
                    <div className=' flex gap-1'>
                        <Call sx={{ color: '#E38B29', fontSize: 20 }} />
                        <a href={`tel:+918191802837`}><p className=' text-sm text-gray-400'>+918191802837</p></a>
                    </div>
                    <div className='flex gap-1'>
                        <Email sx={{ color: '#E38B29', fontSize: 20 }} />
                        <a href={`mailto:warehouseservicez@gmail.com`}><p className=' text-sm text-gray-400'>
                            warehouseservicez@gmail.com</p></a>
                    </div>

                </div>

                <div className=' flex flex-col bg-slate-900 md:py-16 py-6 gap-4 md:pr-12 md:pl-1 px-3 pb-16 lg:pr-20 '>
                    <p className='  font-bold text-white'>PROPERTY CITIES</p>
                    <div>
                        <ul className=' text-indigo-100 list-disc  grid grid-cols-2 gap-2'>
                            <li className='hover:text-primary cursor-pointer list-inside hover:translate-x-2 transition-all duration-300'>Delhi</li>
                            <li className='hover:text-primary cursor-pointer list-inside hover:translate-x-2 transition-all duration-300'>Ludhiana</li>
                            <li className='hover:text-primary cursor-pointer list-inside hover:translate-x-2 transition-all duration-300'>Chandigarh</li>
                            <li className='hover:text-primary cursor-pointer list-inside hover:translate-x-2 transition-all duration-300'>Dehradun</li>
                            <li className='hover:text-primary cursor-pointer list-inside hover:translate-x-2 transition-all duration-300'>Hyderabad</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className=' flex md:flex-row flex-col md:justify-around items-center py-4 px-3 gap-4   text-sm text-gray-500'>
                <p className=' text-center'>© {currentYear} - BEYOT REAL ESTATES DESIGNED BY <Link href="/" className="text-primary"> sikka associates</Link></p>
                <div className=' flex md:gap-10 gap-5 flex-wrap justify-center'>
                    <Link href={'/'} className=' text-center   text-primary'>HOME</Link>
                    <Link href={'/contact'} className='  text-center  hover:text-primary '>CONTACT</Link>
                    <Link href={'/services'} className='  text-center hover:text-primary  '>SERVICES</Link>
                    <Link href={'/about'} className='  text-center    hover:text-primary '>ABOUT</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer