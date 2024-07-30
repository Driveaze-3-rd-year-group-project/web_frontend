import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

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
        
        <section class="bg-deepblue ">
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
        <section class="bg-gray-900">
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
        <section class="bg-gray-50 dark:bg-gray-900 dark:bg-gray-800">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Powering innovation at <span class="font-extrabold">200,000+</span> companies worldwide</h2>
                    <p class="mb-4 font-light ">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
                    <p class="mb-4 font-medium">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease.</p>
                    <a href="#" class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                        Learn more
                        <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
            </div>
        </section>

        <div data-aos="flip-up" class="max-w-xl mx-auto text-center mt-24">
			<h1 class="font-bold text-darken my-3 text-2xl">All-In-One <span class="text-yellow-500">Cloud Software.</span></h1>
			<p class="leading-relaxed text-gray-500">Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.</p>
		</div>
        

 

<section className="py-14">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="md:max-w-lg sm:rounded-lg" alt="" />
                    </div>
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-indigo-600 font-semibold">
                            Professional services
                        </h3>
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Build your SaaS solution with help from our experts
                        </p>
                        <p className="mt-3 text-gray-600">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                        </p>
                        <a href="javascript:void(0)" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

    
        </>

    )
}

export default Landingpage