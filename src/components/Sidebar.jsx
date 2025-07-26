import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = () => {
    const navigate = useNavigate();
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const cartItems = useSelector(state => state.cart.items)

    return (
        <div className="w-full bg-gray-200 rounded p-6 shadow-md h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Cart</h3>
            <div className=' border-b-4 border-dashed border-gray-100'>
                {
                    cartItems.map(item => (
                        <div key={item.id} className="flex-1 ml-4 border-t-2 border-dashed border-white">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <div className='w-full flex justify-between'>
                                <p className="text-sm text-gray-600">Price : </p>
                                <p className="text-sm text-gray-600">₹{item.price}</p>
                            </div>
                            <div className='w-full flex justify-between'>
                                <p className="text-sm text-gray-600">Quantity : </p>
                                <p className="text-sm text-gray-600">{item.quantity}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-green-800">Total:</p>
                <span className="text-lg font-bold">₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
                Checkout
            </button>
        </div>
    )
}

export default Sidebar
