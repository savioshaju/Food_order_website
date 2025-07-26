import React from 'react';

const NoRes = () => {
    return (
        <div className='w-full fixed top-0 left-0 right-0 h-screen bg-green-100 flex flex-col justify-center items-center px-4'>
            <img
                src="https://png.pngtree.com/png-clipart/20220628/original/pngtree-food-logo-png-image_8239850.png"
                alt="No Restaurants"
                className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain rounded-full"
            />
            <p className="text-blue-600 font-semibold text-xl mt-6 text-center">
                No Restaurants Found
            </p>
            <p className="text-gray-700 mt-2 text-center max-w-md">
                We're sorry, but there are no restaurants to display at the moment. Please check back later!
            </p>
        </div>
    );
};

export default NoRes;
