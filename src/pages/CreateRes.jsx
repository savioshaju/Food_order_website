import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenu } from '../redux/slice/menuSlice';
const CreateRes = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        restaurantName: '',
        type: '',
        address: '',
        parkingLot: false,
    });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMsg]);



    const validate = () => {
        const newErrors = {};
        if (!formData.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required';
        if (!formData.type.trim()) newErrors.type = 'Cuisine type is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        return newErrors;
    };

    const generateUniqueId = () => {
        return Math.floor(100 + Math.random() * 900 + Date.now() % 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const restaurantID = generateUniqueId();

        const newRestaurant = {
            restaurantID,
            restaurantName: formData.restaurantName,
            type: formData.type,
            address: formData.address,
            parkingLot: formData.parkingLot,
            menu: [],
            owner: currentUser,
        };

        const existingRestaurants = JSON.parse(localStorage.getItem('Restaurants')) || [];
        localStorage.setItem('Restaurants', JSON.stringify([...existingRestaurants, newRestaurant]));
        dispatch(setMenu({ restaurantId: restaurantID, menuItems: [] }));
        setSuccessMsg(`Restaurant "${formData.restaurantName}" added successfully .`);
        setFormData({ restaurantName: '', type: '', address: '', parkingLot: false });
    };

    return (
        <div className="bg-green-100 min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
            <div className="w-full max-w-2xl bg-white shadow-xl border border-blue-300 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-green-700">Register New Restaurant</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                        <input
                            type="text"
                            name="restaurantName"
                            value={formData.restaurantName}
                            onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="parkingLot"
                            checked={formData.parkingLot}
                            onChange={(e) => setFormData({ ...formData, parkingLot: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="parkingLot" className="text-sm font-medium text-gray-700">
                            Has Parking Lot
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Create Restaurant
                    </button>

                    {successMsg &&
                        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                            {successMsg}
                        </div>}
                </form>
            </div>
        </div>
    );
};

export default CreateRes;
