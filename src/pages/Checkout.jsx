import React, { useState } from 'react';
import Payments from '../components/Payments';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slice/cartSlice';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        address1: '',
        address2: '',
        phone: '',
        pincode: '',
    });

    const [errors, setErrors] = useState({});
    const [showPayment, setShowPayment] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.address1.trim()) newErrors.address1 = 'Address Line 1 is required';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
        if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setShowPayment(true);
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

        const newOrder = {
            user: JSON.parse(localStorage.getItem('currentUser')),
            orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            orderItems: cart,
            date: new Date().toISOString().split('T')[0],
            address: {
                line1: formData.address1,
                line2: formData.address2,
                pincode: formData.pincode,
            },
            phone: formData.phone,
            name: formData.name
        };

        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        dispatch(clearCart(cart))
    };

    if (showPayment) return <Payments />;

    return (
        <div className="bg-green-100 min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
            <div className="w-full max-w-2xl bg-white shadow-xl border border-green-300 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-green-700">Delivery Address</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                        <input
                            type="text"
                            name="address1"
                            value={formData.address1}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                        <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
