import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavSidebar from './NavSidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md"
      >
        ☰
      </button>

      {isSidebarOpen && <NavSidebar />}
    </>
  );
};

export default Navbar;
