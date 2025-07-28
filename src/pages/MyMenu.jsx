// src/pages/MyMenu.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoItems from '../components/NoItems';
import NewItem from '../components/NewItem';

const MyMenu = () => {
    const { restaurantId  } = useParams();
    const [menu, setMenu] = useState([]);
    const [sortedMenu, setSortedMenu] = useState([]);
    const [sortOrder, setSortOrder] = useState("null");
    const [showModal, setShowModal] = useState(false);
    const id = restaurantId;
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("Restaurants")) || [];
        const target = localData.find(res => String(res.restaurantID) === id);
        if (target?.menu) {
            setMenu(target.menu);
            setSortedMenu(target.menu);
        }
    }, [id]);

    const handleSort = () => {
        let sorted = [...sortedMenu];
        if (sortOrder === "null") {
            sorted.sort((a, b) => a.itemPrice - b.itemPrice);
            setSortOrder("asc");
        } else if (sortOrder === "asc") {
            sorted.sort((a, b) => b.itemPrice - a.itemPrice);
            setSortOrder("desc");
        } else {
            sorted = [...menu];
            setSortOrder("null");
        }
        setSortedMenu(sorted);
    };

    const handleDelete = (itemID) => {
        const updated = menu.filter(item => item.itemID !== itemID);
        setMenu(updated);
        setSortedMenu(updated);

        const data = JSON.parse(localStorage.getItem("Restaurants")) || [];
        const index = data.findIndex(res => String(res.restaurantID) === id);
        if (index !== -1) {
            data[index].menu = updated;
            localStorage.setItem("Restaurants", JSON.stringify(data));
        }
    };

    const handleAdd = (newItem) => {
        const updated = [...menu, newItem];
        setMenu(updated);
        setSortedMenu(updated);
        console.log(id)

        const stored = JSON.parse(localStorage.getItem("Restaurants")) || [];

        const index = stored.findIndex(res => String(res.restaurantID) === id);
        if (index === -1) return;

        stored[index].menu = updated;

        localStorage.setItem("Restaurants", JSON.stringify(stored));
    };




    if (!menu || menu.length === 0) {
        return (
            <div className='w-full fixed top-0 left-0 right-0 h-screen bg-green-100 flex flex-col justify-center items-center px-4'>
                <img
                    src="https://i.pinimg.com/originals/f9/98/0f/f9980fdb73ff0acc69d70a8997acb5fa.gif"
                    alt="No Item In menu"
                    className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
                />
                <p className="text-blue-600 font-semibold text-xl mt-6 text-center">
                    Oops! Looks like we don't have any items in the menu yet.
                </p>
                <button
                    onClick={() => setShowModal(true)}
                    className="border border-green-600 rounded-xl px-4 py-2 text-green-700 hover:bg-green-600 hover:text-white"
                >
                    + Add Item
                </button>
                {showModal && <NewItem onClose={() => setShowModal(false)} onAdd={handleAdd} />}
            </div>
        );
    }

    return (
        <div className="bg-green-100 min-h-screen w-full pb-16 px-4 pt-40 relative">
            <div className="absolute top-24 left-4 flex gap-4">
                <button
                    onClick={handleSort}
                    className="border border-green-600 rounded-xl px-4 py-2 text-green-700 hover:bg-green-400 hover:text-white"
                >
                    {sortOrder === "null" ? 'Sort by Price' : sortOrder === "desc" ? 'Price: High → Low' : 'Price: Low → High'}
                </button>

                <button
                    onClick={() => setShowModal(true)}
                    className="border border-green-600 rounded-xl px-4 py-2 text-green-700 hover:bg-green-600 hover:text-white"
                >
                    + Add Item
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {sortedMenu.map((men) => (
                    <div
                        key={men.itemID}
                        className="border border-green-600 bg-white hover:bg-green-100 transition-colors px-6 py-4 shadow-lg rounded-xl flex flex-col justify-between"
                    >
                        <img
                            src={men.imageUrl}
                            alt={men.itemName}
                            className="w-full h-[200px] object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-bold mt-3 text-green-800">{men.itemName}</h3>
                        <p className="text-sm text-gray-700 mt-1">{men.itemDescription}</p>
                        <p className="text-md font-semibold text-green-600 mt-2">₹{men.itemPrice}</p>
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

                        <button
                            onClick={() => handleDelete(men.itemID)}
                            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {showModal && <NewItem onClose={() => setShowModal(false)} onAdd={handleAdd} />}
        </div>
    );
};

export default MyMenu;
