import React from 'react';
import Adminerror from '../components/Adminerror';

function isAdmin() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser?.userType === 'Admin';
}

const Adminroutes = ({ children }) => {
    if (!isAdmin()) {
        return <><Adminerror /></>
    }

    return <>{children}</>;
};

export default Adminroutes;
