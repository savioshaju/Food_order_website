import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
    });

    const [errors, setErrors] = useState({});
    const [login, setlogin] = useState(false);

    const navigate = useNavigate()
    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }


        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';

        if (!formData.userType) newErrors.userType = 'Please select a user type';

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
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const duplicateUser = existingUsers.find(user =>
            user.email === formData.email || user.username === formData.username
        );

        if (duplicateUser) {
            setErrors({ email: 'Email or Username already exists' });
            return;
        }
        setlogin(true)
        const updatedUsers = [...existingUsers, formData];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        localStorage.setItem('currentUser', JSON.stringify(formData));
        localStorage.setItem('status', 'true');

        console.log('Signed up:', formData);
        setTimeout(() => {
            setlogin(false)
            navigate('/');
        }, 1500);
    };

    return (
        <div className="bg-green-100 flex items-center justify-center min-h-screen pt-20">
            <div className="w-full bg-green-100 max-w-3xl px-4 py-6">
                <div className="bg-white shadow-xl border p-8 rounded-2xl">
                    <h2 className="text-center text-xl uppercase font-semibold mb-6">Sign Up Form</h2>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                    placeholder="First Name"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                                <input
                                    type="text"
                                    value={formData.middleName}
                                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                    className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                    placeholder="Middle Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                    placeholder="Last Name"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                placeholder="Username"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                placeholder="9496998890"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className=" mt-1 block w-full px-3 py-2 bg-white border border-gray-300  rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"

                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                User Type <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="Customer"
                                        checked={formData.userType === 'Customer'}
                                        onChange={(e) =>
                                            setFormData({ ...formData, userType: e.target.value })
                                        }
                                        className="mr-2"
                                    />
                                    Customer
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="Admin"
                                        checked={formData.userType === 'Admin'}
                                        onChange={(e) =>
                                            setFormData({ ...formData, userType: e.target.value })
                                        }
                                        className="mr-2"
                                    />
                                    Admin
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="Seller"
                                        checked={formData.userType === 'Seller'}
                                        onChange={(e) =>
                                            setFormData({ ...formData, userType: e.target.value })
                                        }
                                        className="mr-2"
                                    />
                                    Seller
                                </label>
                            </div>
                            {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                        >
                            Sign Up
                        </button>
                        <p className="text-center text-sm mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
            {login && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                    Signup Successful!
                </div>
            )}
        </div>
    );
};

export default Signup;
