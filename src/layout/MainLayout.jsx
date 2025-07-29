import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Contactdetails from '../components/Contactdetails';
import { useLocation,useNavigate } from 'react-router-dom';
const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex  min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
        {['/Contact','/login','/signup'].includes(location.pathname) && <Contactdetails />}
      </div>
    </div>
  );
};

export default MainLayout;
