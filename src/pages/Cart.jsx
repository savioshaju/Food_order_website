import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity } from '../redux/slice/cartSlice';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items)

  if (cartItems.length === 0) {
    return (
      <div className='w-full h-screen bg-white flex flex-col justify-center items-center px-4'>
        <img
          src="https://cdn.dribbble.com/userupload/24238262/file/original-6b12fd6ca7a8dd70a94af6e0f14956d7.gif"
          alt="cart logo"
          className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
        />
        <p className="text-blue-600 font-semibold text-xl mt-6 text-center">
          Nothing in your cart yet
        </p>
        <p className="text-gray-700 mt-2 text-center max-w-md">
          Browse through our delicious options and add your favorites!
        </p>
        <Link
          to="/restaurant"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-green-100 min-h-screen w-full pt-32 pb-16 px-4">
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">Your Cart</h2>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

        <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-3xl shadow">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600"
                  >−</button>
                  <span className="font-bold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600"
                  >+</button>
                </div>
              </div>
              <div className="text-right font-semibold min-w-[80px]">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/4 w-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Cart;
