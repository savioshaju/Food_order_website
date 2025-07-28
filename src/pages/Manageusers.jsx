import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('All');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(allUsers);
    }, []);

    const handleDelete = (email) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter((u) => u.email !== email);
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            setDeleteSuccess(true);

            setTimeout(() => {
                setDeleteSuccess(false);
            }, 4000);
        }
    };

    const filteredUsers =
        filter === 'All' ? users : users.filter((u) => u.userType === filter);

    return (
        <div className="bg-green-100 min-h-screen p-6 pt-24">
            <div className="flex justify-start gap-4 mb-6">
                {['All', 'Admin', 'User', 'Seller'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-xl transition-colors duration-200 ${filter === type
                            ? 'bg-green-700 text-white'
                            : 'bg-gray-700/50 text-white'
                            } hover:bg-green-600`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {filteredUsers?.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((user, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4 relative">
                            <h3 className="text-lg font-bold text-green-700 mb-2">
                                {user.firstName} {user.lastName}
                            </h3>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phoneNumber}</p>
                            <p><strong>DOB:</strong> {user.dob}</p>
                            {user.userType === "Admin" ? (
                                <div className="px-2 py-2 rounded-full ring-2 ring-red-500 bg-red-200/50 absolute top-2 right-2">{user.userType}</div>
                            ) : user.userType === "User" ? (
                                <div className="px-2 py-2 rounded-full ring-2 ring-green-500 bg-green-200/50 absolute top-2 right-2">{user.userType}</div>
                            ) : (
                                <div className="px-2 py-2 rounded-full ring-2 ring-yellow-500 bg-yellow-200/50 absolute top-2 right-2">{user.userType}</div>
                            )}

                            <button
                                onClick={() => handleDelete(user.email)}
                                className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 w-full text-gray-600 text-center">
                    <p className="text-lg">
                        No users found for <strong>{filter}</strong>
                    </p>
                </div>
            )}
            {deleteSuccess && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                    User deleted successfully!
                </div>
            )}

        </div>
    );
};

export default UserList;
