import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRestaurantMenu } from '../assets/api';
import { setMenu, setMenuLoading, setMenuError } from '../redux/slice/menuSlice';
import NoItems from '../components/NoItems';
import Loading from '../components/Loading';
import Error from '../components/Error';

const manageResMen = () => {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu.data[restaurantId]);
    const loading = useSelector(state => state.menu.loading);
    const error = useSelector(state => state.menu.error);
   

    const [sorted, setSorted] = useState([]);
    const [sortOrder, setSortOrder] = useState("null");

    const handleSort = () => {
        let newOrder = sortOrder === "null" ? "desc" : sortOrder === "desc" ? "asc" : "desc";
        const items = [...sorted].sort((a, b) => {
            return newOrder === "desc" ? b.itemPrice - a.itemPrice : a.itemPrice - b.itemPrice;
        });
        setSorted(items);
        setSortOrder(newOrder);
    };

    const deleteItem = (id) => {
        const data = sorted.filter(i => i.itemID !== id);
        dispatch(setMenu({ restaurantId, menuItems: data }));
        setSorted(data);
    };

    useEffect(() => {
        if (!menu) {
            const getRestaurantMenu = async () => {
                dispatch(setMenuLoading());
                try {
                    const data = await fetchRestaurantMenu(restaurantId);
                    dispatch(setMenu({ restaurantId, menuItems: data }));
                } catch (err) {
                    dispatch(setMenuError(err.message));
                }
            };
            getRestaurantMenu();
        }
    }, [dispatch, restaurantId, menu]);

    useEffect(() => {
        if (menu) {
            const menuItems = menu.map(item => ({
                ...item,
                rating: Math.floor(Math.random() * 5) + 1,
            }));
            setSorted(menuItems);
        }
    }, [menu]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <Error />;
    }

    return (
        <div className="bg-green-100 min-h-screen w-full px-4 pt-40 relative">
            <button
                onClick={handleSort}
                className="absolute left-24 top-24 border border-green-600 rounded-xl px-4 py-2 text-green-700 hover:bg-green-400 hover:text-white whitespace-nowrap"
            >
                {sortOrder === "null"
                    ? 'Sort by Price'
                    : sortOrder === "desc"
                    ? 'Price: High → Low'
                    : 'Price: Low → High'}
            </button>
            {sorted.length === 0 ? (
                <NoItems />
            ) : (
                <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sorted.map((men) => (
                        <div
                            key={men.itemID}
                            className="relative border border-green-600 bg-white hover:bg-green-100 transition-colors px-6 py-4 shadow-lg rounded-xl flex flex-col justify-between"
                        >
                            <button
                                onClick={() => deleteItem(men.itemID)}
                                className="absolute bottom-4 right-4 mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <img
                                src={men.imageUrl}
                                alt={men.itemName}
                                className="w-full h-[180px] object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-bold mt-3 text-green-800">{men.itemName}</h3>
                            <p className="text-sm text-gray-700 mt-1">{men.itemDescription}</p>
                            <p className="text-md font-semibold text-green-600 mt-2">₹{men.itemPrice}</p>
                            <p className="text-sm text-gray-500">Restaurant: {men.restaurantName || "Britannia & Co."}</p>
                            <div className="flex items-center mt-2">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-4 h-4 mr-1 ${index < men.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.617h3.8c.969 0 1.371 1.24.588 1.81l-3.073 2.234 1.175 3.617c.3.921-.755 1.688-1.54 1.118L10 13.187l-3.073 2.234c-.785.57-1.84-.197-1.54-1.118l1.175-3.617-3.073-2.234c-.783-.57-.38-1.81.588-1.81h3.8l1.175-3.617z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default manageResMen;
