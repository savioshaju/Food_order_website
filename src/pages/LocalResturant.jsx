import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, incrementQuantity, decrementQuantity } from '../redux/slice/cartSlice';
import NoItems from '../components/NoItems';

const LocalRestaurant = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const [menu, setMenu] = useState([]);
  const [sortedMenu, setSortedMenu] = useState([]);
  const [sortOrder, setSortOrder] = useState("null");

  const id=restaurantId;
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("Restaurants")) || [];
    const target = localData.find(res => String(res.restaurantID) === id);
    if (target?.menu) {
      console.log(target.menu)
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

  const isItemPresent = (itemID) => {
    const item = cart.find(i => i.id === itemID);
    return item ? item.quantity : 0;
  };

  if (!menu || menu.length === 0) return <NoItems />;

  return (
    <div className="bg-green-100 min-h-screen w-full pb-16 px-4 pt-40 relative">
      <button
        onClick={handleSort}
        className="absolute left-4 top-24 border border-green-600 rounded-xl px-4 py-2 text-green-700 hover:bg-green-400 hover:text-white"
      >
        {sortOrder === "null"
          ? 'Sort by Price'
          : sortOrder === "desc"
            ? 'Price: High → Low'
            : 'Price: Low → High'}
      </button>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMenu.map((men) => (
          <div
            key={men.itemID}
            className="border border-green-600 bg-white hover:bg-green-100 transition-colors px-6 py-4 shadow-lg rounded-xl flex flex-col justify-between"
          >
            <img
              src={men.imageUrl}
              alt={men.itemName}
              className="w-full h-[180px] object-cover rounded-lg"
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

            <div className="mt-4">
              {isItemPresent(men.itemID) === 0 ? (
                <button
                  onClick={() =>
                    dispatch(addItem({
                      id: men.itemID,
                      name: men.itemName,
                      price: men.itemPrice,
                      image: men.imageUrl,
                    }))
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decrementQuantity(men.itemID))}
                    className="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600"
                  >
                    −
                  </button>
                  <span className="font-bold">{isItemPresent(men.itemID)}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(men.itemID))}
                    className="bg-green-600 text-white w-8 h-8 rounded hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalRestaurant;
