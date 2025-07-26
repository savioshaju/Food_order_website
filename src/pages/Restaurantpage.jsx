import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setError, setRestaurant } from '../redux/slice/restaurantSlice'
import { fetchRestaurant } from '../assets/api';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NoRes from '../components/NoRes';
const Restaurantpage = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant.data)
  const loading = useSelector(state => state.restaurant.loading)
  const error = useSelector(state => state.restaurant.error)
  const cartItems = useSelector(state => state.cart.items)

  useEffect(() => {
    if (!restaurant) {
      const getRestaurant = async () => {
        dispatch(setLoading());
        try {
          const data = await fetchRestaurant();
          console.log("fetched");
          dispatch(setRestaurant(data));
        } catch (err) {
          dispatch(setError(err.message));
        }
      };
      getRestaurant();
    }
  }, [dispatch, restaurant]);



  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return (
      <Error />
    )
  }
  if (restaurant.length === 0) {
        return (<NoRes />)
    }
  return (
    <div className="bg-green-100 min-h-screen w-full px-4 pt-32   relative ">
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {restaurant?.map((res) => (
          <Link
            to={`/Restaurant/${res.restaurantID}`}
            key={res.restaurantID}
            className='border min-h-40 border-green-600 bg-white hover:bg-green-100 transition-colors px-6 py-4 shadow-lg rounded-xl flex flex-col justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-green-900'>{res.restaurantName}</h2>
              <div className='flex items-center text-sm text-gray-700 mb-1'>
                <svg className='w-4 h-4 mr-2 text-green-700' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
                {res.address}
              </div>
              <div className='flex items-center text-sm text-gray-600'>
                <svg className='w-4 h-4 mr-2 text-green-700' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M4 3a1 1 0 00-1 1v2a1 1 0 001 1h1v9a1 1 0 001 1h8a1 1 0 001-1V7h1a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2V5h10v1H5V5z' />
                </svg>
                {res.type}
              </div>
              <div className='flex items-center mt-2'>
                {(() => {
                  const rating = Math.floor(Math.random() * 5) + 1;
                  return Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 mr-1 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.617a1 1 0 00.95.69h3.812c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.175 3.617c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.175-3.617a1 1 0 00-.364-1.118L2.536 9.044c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.951-.69l1.175-3.617z' />
                    </svg>
                  ));
                })()}
              </div>

            </div>
            <div className='text-xs text-gray-600 mt-2'>
              Parking:{" "}
              <span className={res.parkingLot ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                {res.parkingLot ? "Available" : "Not Available"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Restaurantpage