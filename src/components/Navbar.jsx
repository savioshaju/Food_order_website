import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchallItems } from '../assets/api';
import { setAllMenu, setAllMenuLoading, setAllMenuError, setSearch } from '../redux/slice/allMenuSlice';
import NavSidebar from './NavSidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleSearch = async (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    dispatch(setSearch(keyword.trim() !== ""));
    dispatch(setAllMenuLoading());

    try {
      const allItems = await fetchallItems();
      const filtered = keyword.trim()
        ? allItems.filter((item) => item.itemName.toLowerCase().includes(keyword))
        : allItems;

      dispatch(setAllMenu(filtered));
      navigate('/');
    } catch (err) {
      dispatch(setAllMenuError(err.message));
    }
  };

  return (
    <>
      {!['/checkout', '/login', '/signup'].includes(location.pathname)
        && (<nav className="w-full bg-green-200 shadow-md px-4 py-3 flex items-center justify-between fixed top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-none focus:outline-none text-green-700 font-bold text-lg"
            >
              ☰
            </button>

            <div className="hidden md:flex items-center gap-2">
              <img src="https://cdn.vectorstock.com/i/1000v/13/80/organic-food-restaurant-logo-vector-17131380.jpg" alt="Logo" className=" object-contain rounded-full w-16 h-16" />
              <span className="text-xl font-semibold text-green-700 hidden sm:block">
                MyRestaurant
              </span>
            </div>
          </div>
          {location.pathname === '/Contact' ? (
            <button
              onClick={() => navigate('/About')}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-200"
            >
              About Us
            </button>
          ) : location.pathname === '/About' ? null : (
            <div className="w-2/3 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              />
            </div>
          )}

        </nav>
        )}

      {isSidebarOpen && <NavSidebar />}
    </>
  );
};

export default Navbar;
