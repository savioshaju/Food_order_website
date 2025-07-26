import React from 'react';
import { Link } from 'react-router-dom';

const NoItems = () => {
    return (
        <div className='w-full fixed top-0 left-0 right-0 h-screen  bg-green-100 flex flex-col justify-center items-center px-4'>
            <img
                src="https://i.pinimg.com/originals/f9/98/0f/f9980fdb73ff0acc69d70a8997acb5fa.gif"
                alt="No Item In menu"
                className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
            />
            <p className="text-blue-600 font-semibold text-xl mt-6 text-center">
                Oops! Looks like we don't have any items in the menu yet.
            </p>
            <p className="text-gray-700 mt-2 text-center max-w-md">
                Please check out other restaurants or try again later!
            </p>
            <Link
                to="/restaurants"
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
            >
                Explore Restaurants
            </Link>
        </div>
    );
}

export default NoItems;
