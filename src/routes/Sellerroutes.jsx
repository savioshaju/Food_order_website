import React from 'react';
import Adminerror from '../components/Adminerror';

function isSeller() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser?.userType === 'Seller';
}

const Sellerroutes = ({ children }) => {
    if (!isSeller()) {
        return <><Adminerror /></>
    }

    return <>{children}</>;
};

export default Sellerroutes;
