import React from 'react';
import { Link } from 'react-router-dom';

const Adminerror = () => {
  return (
    <div className="w-full min-h-screen bg-red-100 flex flex-col items-center justify-center px-6 py-12">
      <img
        src="https://e7.pngegg.com/pngimages/306/522/png-clipart-computer-icons-abmeldung-login-lock-miscellaneous-text.png"
        alt="Access Denied"
        className="w-20 h-20 sm:w-28 sm:h-28 mb-6 opacity-70 rounded-full"
      />
      <h1 className="text-xl sm:text-3xl font-semibold text-red-700 mb-2 text-center">
        Access Denied
      </h1>
      <p className="text-sm sm:text-lg text-red-600 mb-3 max-w-md text-center leading-relaxed">
        You do not have permission to access this page.
      </p>
      <p className="text-sm sm:text-base text-red-600 max-w-md text-center">
        Please log in as an <Link to={'/login'}><strong>Admin</strong></Link> to continue.
      </p>
    </div>
  );
};

export default Adminerror;
