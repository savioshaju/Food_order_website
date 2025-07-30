import React from 'react';
import ContactPage from './ContactPage';
import Banner from '../components/Banner';
const About = () => {
    return (
        <>
            <div className="bg-green-100 min-h-screen w-full  px-6 py-10 pb-0">
                <div className='mt-24'>

                    <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>

                    <div className="max-w-4xl mx-auto text-justify leading-relaxed">
                        <p>
                            Welcome to <strong>Delics Home</strong> — your reliable food delivery companion. Our platform connects you with a wide range of cuisines, prepared by trusted chefs and restaurants, and delivers them directly to your doorstep with speed and care.
                        </p>
                        <p className="mt-4">
                            At Delics Home, we prioritize quality, hygiene, and customer satisfaction. Whether you're craving a quick snack or a full-course meal, our streamlined ordering experience ensures your food arrives hot, fresh, and on time.
                        </p>
                        <p className="mt-4">
                            With a growing network of partner kitchens and real-time tracking, we’re revolutionizing the way people discover and enjoy food. Experience convenience, taste, and trust — all in one place.
                        </p>
                        <p className="mt-4 font-semibold">Delics Home — Delivering Delight, Daily.</p>
                    </div>
                    <Banner />
                </div>
            </div>
            <ContactPage />
        </>
    );
};

export default About;
