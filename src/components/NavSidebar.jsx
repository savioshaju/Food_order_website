import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavSidebar = () => {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      const fullName = [storedUser.firstName, storedUser.middleName, storedUser.lastName]
        .filter(Boolean)
        .join(' ');
      setUser(fullName);
      setUserType(storedUser.userType || 'User');
    } else {
      setUser(null);
      setUserType(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('status');
    localStorage.removeItem('currentUser');
    setLogoutSuccess(true);

    setTimeout(() => {
      setLogoutSuccess(false);
      navigate('/login');
    }, 1500);
  };


  const getLinkClass = (path) =>
    location.pathname === path
      ? 'text-green-600 font-bold block ring ring-green-600 rounded-xl px-4 py-2'
      : 'text-gray-700 hover:text-green-600 block rounded-xl px-4 py-2';

  return (
    <>
      <div className="w-56 min-h-screen bg-green-200 shadow-md px-6 py-20 space-y-4 sticky bottom-0 hidden md:block">
      </div>

      <div className="fixed w-56 min-h-screen bg-green-200 shadow-md px-6 py-20 space-y-4 top-0 left-0 bottom-0 z-30 overflow-y-auto hide-scrollbar">
        {user ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="font-semibold text-green-600 uppercase text-center text-lg">
              {user}
            </div>
            <Link to="/profile" className="w-full flex justify-center">
              <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 w-3/4">
                My Profile
              </button>
            </Link>
            <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 w-3/4">
              Log Out
            </button>
          </div>

        ) : (
          <div className="flex flex-col space-y-2">
            <div className="text-gray-500">Guest</div>
            <div className="flex space-x-2">
              <Link to="/login">
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-xl hover:bg-green-100">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="border-t border-gray-300 pt-4 text-sm text-gray-500"></div>
        <Link className={getLinkClass('/')} to="/">Home</Link>
        <Link className={getLinkClass('/Restaurant')} to="/Restaurant">Restaurants</Link>
        <Link className={getLinkClass('/Cart')} to="/Cart">Cart</Link>
        <Link className={getLinkClass('/orders')} to="/orders">My Orders</Link>
        <Link className={getLinkClass('/Contact')} to="/Contact">Contact</Link>

        {userType === 'Admin' && (
          <>
            <div className="border-t border-gray-300 pt-4 text-sm text-gray-500">Admin Panel</div>
            <Link className={getLinkClass('/admin/manageRestaurants')} to="/admin/ManageRestaurants">Manage Restaurants</Link>
            <Link className={getLinkClass('/admin/users')} to="/admin/users">Manage Users</Link>
            <Link className={getLinkClass('/admin/ManageMenu')} to="/admin/ManageMenu">Manage Menu</Link>
          </>
        )}
        {userType === 'Seller' && (
          <>
            <div className="border-t border-gray-300 pt-4 text-sm text-gray-500">Seller Panel</div>
            <Link className={getLinkClass('/Seller/CreateRestaurants')} to="/Seller/CreateRestaurants">Create Restaurants</Link>
            <Link className={getLinkClass('/Seller/MyRestaurants')} to="/Seller/MyRestaurants">Manage Menu</Link>
          </>
        )}

      </div>
      {logoutSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Logged out successfully!
        </div>
      )}

    </>
  );
};

export default NavSidebar;
