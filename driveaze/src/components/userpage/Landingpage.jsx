import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClipboardCheck } from "react-icons/fa";

import img1 from "../../assets/LandingPageCarousel/1.svg";
import img2 from "../../assets/LandingPageCarousel/2.svg";
import img3 from "../../assets/LandingPageCarousel/3.svg";
import img4 from "../../assets/LandingPageCarousel/4.svg";

const Landingpage = () => {
    const [curr, setCurr] = useState(0);

    const slides = [
        img1,
        img2,
        img3,
        img4
    ];

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    const autoSlide = true;
    const autoSlideInterval = 3000;

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval]);

    return (
        <>
        <style>
            {`
                body::-webkit-scrollbar {
                    display: none;
                }
            `}
        </style>
        <section className="h-[calc(100vh-96px)] mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                <div>
                    <h1 className='font-bold text-4xl xl:text-5xl'>
                        <span className="text-driveazered">SAMARASINGHE</span>
                        <span className='text-deepblue'> MOTORS </span>
                    </h1>
                    <h2 className='text-black font-bold text-3xl xl:text-4xl'>The name you can trust</h2>
                </div>
                <p className="text-black max-w-xl leading-relaxed sm:mx-auto lg:ml-0 text-justify">
                    Welcome to Samarasinghe Motors Pvt Ltd, the premier service station in Matara area over 65 years of trusted service, renowned for its excellence and large-scale operations. With a dedicated team of skilled professionals, we specialize in servicing all types of Japanese hybrid petrol and electric vehicles, ensuring top-notch care for your car. Join our extensive customer base and experience the superior service that has made us a trusted name in the industry.
                </p>
                <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                    <a href="/login" className="px-7 py-3 w-full  text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-center rounded-md block sm:w-auto">
                        Book your service
                    </a>
                </div>
            </div>

            <div className="overflow-hidden relative shadow-lg rounded-lg">
                <div
                    className="flex transition-transform ease-in-out duration-500 w-120"
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <img key={index} src={slide} alt={`Slide ${index}`} className="w-full" />
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                        onClick={prev}
                        className="p-1 rounded-full shadow text-gray-800 hover:bg-white"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={next}
                        className="p-1 rounded-full shadow  text-gray-800 hover:bg-white"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>
                <div className="absolute bottom-4 right-0 left-0">
                    <div className="flex items-center justify-center gap-2">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                className={`
                                    transition-all w-3 h-3 bg-white rounded-full
                                    ${curr === i ? "p-2" : "bg-opacity-50"}
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <section id="authorized-brands" class="bg-deepblue ">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <h2 class="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 lg:mb-16 dark:text-white md:text-4xl">We are <span className="text-driveazered"> Authorized Dealers for spare parts</span> & <span className="text-indigo-400"> service partners for </span></h2>
                <div class="flex overflow-hidden space-x-16 group">
                    <div class="flex animate-loop-scroll space-x-16 group-hover:paused">
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/nissan.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/mitsubishi.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/toyota.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/kia.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/ford.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/isuzu.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                    </div>
                    <div class="flex animate-loop-scroll space-x-16 group-hover:paused" aria-hidden="true">
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/nissan.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/mitsubishi.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/toyota.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/kia.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/ford.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                        <div class="flex justify-center items-center">
                            <img src='./src/assets/LandingPageVehicleLogos/isuzu.svg' alt="logo" class="h-28 max-w-none" />                    
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section  id="about-us" class="bg-gray-900">
            <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div class="font-light text-white sm:text-lg">
                    <h1 class="mb-8 text-4xl font-extrabold text-white">About Us</h1>
                    <p class="mb-4 max-w-xl leading-relaxed sm:mx-auto lg:ml-0 text-justify">Samarasinghe Motors Ltd. is one of the pioneers and largest automobile service company in Southern Region of Sri Lanka based in Matara.</p>
                    <p class="mb-4 max-w-xl leading-relaxed sm:mx-auto lg:ml-0 text-justify">The company offers a wide range of services for almost all purposes, since the year 1955. Over the years we have built our reputation through extending trustworthiness and high quality services to our clients. Our prominence on high quality and customer satisfaction service has placed us with the high growth of clients.</p>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <img src="./src/assets/LandingPageAboutUs/about_us1.svg" class="w-full rounded-lg"  alt="office content 1"/>
                    <img class="mt-4 w-full rounded-lg lg:mt-10" src="./src/assets/LandingPageAboutUs/about_us2.svg" alt="office content 2"/>
                </div>
            </div>
        </section>
         <section id="services" class="bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div class="mb-8 max-w-screen-md lg:mb-16">
                    <h2 class="mb-4 text-4xl font-extrabold text-white">Our Services</h2>
                    <p class="text-gray-500 sm:text-xl dark:text-gray-400 text-justify">With a global approach to trustworthy service delivery, the company aims to cater to its customers’ needs by keeping the workshop with a wide range of latest equipment, tools and technology supported through efficient, well-qualified and experienced team, all getting converged to provide high-quality, ONE-STOP services. Moreover, starting the implementation of the “Toyota System Management” has inevitably facilitated moving towards our vision. </p>
                </div>
                <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Fuel System Services</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Cooling System Repair</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Engine Repair & Overhaul</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Exhaust System Repair</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Hybrid Vehicle Services</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Diesel Engine Services</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Petrol Engine Services</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Electrical System Services</h3>
                    </div>
                    <div>
                        <div class="flex justify-center ml-20 items-center mb-4 w-10 h-10 rounded-full text-white text-4xl bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <FaClipboardCheck />
                        </div>
                        <h3 class="mb-2 text-xl font-bold dark:text-white">Body Works & Paint Services</h3>
                    </div>
                </div>
            </div>
        </section>

        <section id="contacts" >
            <div className="max-w-screen-xl my-20 mx-auto px-4 text-gray-800 md:px-8">
                <div className="max-w-xl space-y-3">
                    <h3 className="text-gray-900 text-5xl font-semibold">
                        Contact Us
                    </h3>
                    <p className="text-driveazered text-2xl font-semibold sm:text-4xl">
                        Let us know how we can help
                    </p>
                    <p>
                        We’re here to help and answer any question you might have, We look forward to hearing from you.
                    </p>
                </div>
                <div>
                    <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6 items-center lg:gap-x-24">
                        <li>
                            <h4 className="text-gray-800 text-lg font-medium">Address</h4>
                            <div className="mt-3 flex items-center gap-x-3">
                                <div className="flex-none text-gray-600">
                                    <FaMapMarkerAlt />
                                </div>
                                <p> 21, Station Road, Matara, Matara 81000.</p>
                            </div>
                        </li>
                        <li>
                            <h4 className="text-gray-800 text-lg font-medium">Phone</h4>
                            <div className="mt-3 flex items-center gap-x-3">
                                <div className="flex-none text-gray-600">
                                    <FaPhoneAlt />
                                </div>
                                <p>+94412222768</p>
                            </div>
                        </li>
                        <li>
                            <h4 className="text-gray-800 text-lg font-medium">Email</h4>
                            <div className="mt-3 flex items-center gap-x-3">
                                <div className="flex-none text-gray-600">
                                    <FaEnvelope />
                                </div>
                                <p>samarasinghemotors@gmail.com</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    
        </>

    )
}

export default Landingpage