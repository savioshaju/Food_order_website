import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Myorders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

        if (user) {
            const userOrders = allOrders.filter(
                (order) => order.user.email === user.email
            );
            setOrders(userOrders);
        }
    }, []);

    if (orders.length === 0) {
        return (
            <div className='px-8 pt-16 w-full h-screen bg-green-100 flex flex-col justify-center items-center'>
                <div className='pt-6 text-center'>
                    <img
                        src="https://toppng.com/uploads/preview/food-and-beverage-food-and-beverage-logo-11563045826v8svmdw5cr.png"
                        alt="Order Success"
                        className="w-56 h-56 mb-6 rounded-full mx-auto"
                    />
                    <p className="text-green-600 text-lg mb-4">
                        You haven't placed any orders yet. <br /> Visit our restaurants to explore delicious options!
                    </p>
                    <Link
                        to={'/Restaurant'}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Restaurants
                    </Link>
                </div>
            </div>
        );
    }



    return (
        <div className="bg-green-100 min-h-screen w-full pb-16 px-4 pt-24 ">
            <h2 className="text-xl text-green-700 font-bold mb-4">My Orders</h2>
            <div className='w-full flex flex-col items-center justify-center'>

                {orders.map(order => (
                    <div key={order.orderId} className=" w-[80%] border-2 border-grey-100 rounded-xl p-4 bg-white shadow mb-4 hover:bg-green-200 duration-300 cursor-pointer">
                        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-grey-300 pb-2">

                            <div className="flex flex-col">
                                <div className="text-md text-black font-semibold">
                                    Order ID
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    {order.orderId}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="text-md text-black font-semibold whitespace-nowrap">
                                    Order Date
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    {new Date(order.date).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2  py-2">
                            {order.orderItems.items.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-300 p-2 rounded-lg shadow w-full">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mb-2 sm:mb-0" />
                                    <div className="flex-1 sm:ml-4 text-center sm:text-left">
                                        <h3 className="text-base font-semibold truncate">{item.name}</h3>
                                        <p className="text-sm text-gray-600">₹{item.price}</p>
                                    </div>
                                    <div className="flex-1 sm:ml-4 text-center sm:text-right">
                                        <p className="text-sm font-semibold">Qty: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Total: ₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='border-t border-grey-300 flex justify-between'>
                            <div className="flex flex-col">
                                <div className="text-md text-black font-semibold">
                                    Total amount
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    ₹{order.orderItems.totalPrice}
                                </div>
                            </div>
                            <div className=" flex-col hidden md:flex">
                                <div className="text-md text-black font-semibold">
                                    Ordered by
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-md text-gray-500 font-semibold">
                                        Name : {order.name}
                                    </div>
                                    <div className="text-md text-gray-500 font-semibold">
                                        Phone : {order.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-md text-black font-semibold">
                                    Address
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    {`${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ''}, ${order.address.pincode}`}

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Myorders;
