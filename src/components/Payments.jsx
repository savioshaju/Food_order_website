import React from 'react'
import { useNavigate } from 'react-router-dom';
const Payments = () => {

    const navigate = useNavigate();

    const handleViewOrder = () => {
        navigate('/orders');
    };

    return (
        <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center px-4">
            <div className="w-40 h-40 mb-6 p-0 overflow-hidden rounded-full bg-green-100">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhNXAHd9xMh2TSeOvvXVs4wtMNSAbPbEIIA&s"
                    alt="Order Success"
                    className="w-40 h-40 object-cover rounded-full object-center"
                />
            </div>


            <h2 className="text-2xl font-bold text-green-800 mb-4">Order Placed Successfully!</h2>

            <button
                onClick={handleViewOrder}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
                View Order
            </button>
        </div>
    );
};


export default Payments