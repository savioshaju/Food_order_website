import React, { useState, useEffect } from 'react';

const images = [
    
    "https://marketplace.canva.com/EAGFv9wbcDA/1/0/1600w/canva-orange-and-white-modern-asian-food-restaurant-outdoor-banner-kediZUS4TYY.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4BGSQcW2E3hJ39JWp39B4gb8dSIg8SsxsxQ&s",
    "https://t4.ftcdn.net/jpg/03/01/76/65/360_F_301766534_Nd0WoLqus2TVilLcRQL6OMACiJeEgnWu.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/049/647/928/small_2x/delicious-indian-meal-with-biryani-rice-photo.jpeg",
    "https://st.depositphotos.com/1000589/56675/i/450/depositphotos_566755278-stock-photo-indian-food-assortment-light-background.jpg",
    "https://img.freepik.com/free-vector/watercolor-indian-food-restaurant-facebook-cover_23-2149445883.jpg?semt=ais_hybrid&w=740&q=80",
];

const Banner = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearTimeout(timer);
    }, [index]);


    const handleNext = () => setIndex((index + 1) % images.length);
    const handlePrev = () => setIndex((index - 1 + images.length) % images.length);

    return (
        <div className="relative w-full h-80 object-contain rounded-xl pt-4">
            <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain transition-opacity duration-700 ease-in-out"
            />

           
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
            >
                ‹
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
            >
                ›
            </button>
        </div>
    );
};

export default Banner;
