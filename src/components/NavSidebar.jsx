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
        <Link className={`${getLinkClass('/')} flex flex-row whitespace-nowrap gap-2`} to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

          Home
        </Link>
        <Link className={`${getLinkClass('/Restaurant')} flex flex-row whitespace-nowrap gap-2`} to="/Restaurant">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>

          Restaurants
        </Link>
        <Link className={`${getLinkClass('/Cart')} flex flex-row whitespace-nowrap gap-2`} to="/Cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Cart
        </Link>
        <Link className={`${getLinkClass('/orders')} flex flex-row whitespace-nowrap gap-2`} to="/orders">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          My Orders
        </Link>
        <Link className={`${getLinkClass('/Contact')} flex flex-row whitespace-nowrap gap-2`} to="/Contact">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15a2.25 2.25 0 002.25-2.25v-2.438a1.5 1.5 0 00-1.204-1.474l-3.43-.686a1.5 1.5 0 00-1.576.619l-.772 1.16a12.056 12.056 0 01-5.017-5.017l1.16-.772a1.5 1.5 0 00.619-1.576l-.686-3.43a1.5 1.5 0 00-1.474-1.204H4.5A2.25 2.25 0 002.25 6.75z" />
          </svg>
          Contact
        </Link>

        {userType === 'Admin' && (
          <>
            <div className="border-t border-gray-300 pt-4 text-sm text-gray-500">Admin Panel</div>
            <Link className={`${getLinkClass('/admin/ManageRestaurants')} flex flex-row  gap-2`} to="/admin/ManageRestaurants">
              <div className=' h-full flex justify-center items-center py-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V3h18v18M9 17h6M9 13h6M9 9h6" />
                </svg>

              </div>
              Manage Restaurants
            </Link>
            <Link className={`${getLinkClass('/admin/users')} flex flex-row whitespace-nowrap gap-2`} to="/admin/users">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              Manage Users
            </Link>
            <Link className={`${getLinkClass('/admin/ManageMenu')} flex flex-row whitespace-nowrap gap-2`} to="/admin/ManageMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75H7.5A2.25 2.25 0 005.25 6v12A2.25 2.25 0 007.5 20.25h9A2.25 2.25 0 0018.75 18V6A2.25 2.25 0 0016.5 3.75zM9 9h6m-6 3h6m-6 3h3" />
              </svg>
              Manage Menu
            </Link>
          </>
        )}
        {['Seller', 'Admin'].includes(userType) && (
          <>
            {userType === 'Seller' && (
              <div className="border-t border-gray-300 pt-4 text-sm text-gray-500">Seller Panel</div>
            )}
            <Link className={`${getLinkClass('/Seller/CreateRestaurants')} flex flex-row gap-2`} to="/Seller/CreateRestaurants">
              <div className=' h-full flex justify-center items-center py-2'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              Create Restaurants
            </Link>
            <Link className={`${getLinkClass('/Seller/MyRestaurants')} flex flex-row gap-2`} to="/Seller/MyRestaurants">
              <div className=' h-full flex justify-center items-center py-2'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              </div>

              Manage My Menu
            </Link>
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
