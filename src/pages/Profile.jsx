import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(storedUser);
        setFormData(storedUser);
    }, []);

    const handleEdit = () => {
        setEditable(true);
    };

    const handleCancel = () => {
        setFormData(user);
        setEditable(false);
    };

    const handleSave = () => {
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];

        const others = allUsers.filter(u => u.email !== user.email);

        const duplicateUsername = others.find(u => u.username === formData.username);
        const duplicatePhone = others.find(u => u.phoneNumber === formData.phoneNumber);

        if (duplicateUsername || duplicatePhone) {
            let errorMsg = '';
            if (duplicateUsername) errorMsg += 'username ';
            if (duplicatePhone) errorMsg += 'phone number ';
            alert(errorMsg + 'already used');
            return;
        }


        const updatedUsers = allUsers.map(u =>
            u.email === user.email ? { ...u, ...formData } : u
        );


        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(formData));

  
        setUser(formData);
        setEditable(false);
        alert('Profile updated successfully!');
    };


    if (!user) {
        return (
            <div className='px-8 pt-16 w-full h-screen bg-red-50 flex flex-col justify-center items-center'>
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-red-200 animate-spin dark:text-red-600 fill-red-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className='font-bold text-red-400 text-2xl px-2' >Loading...</span>
                </div>
                <div className='pt-6'>
                    <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-green-100 w-full min-h-screen flex justify-center items-center px-4 py-12">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">My Profile</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            readOnly={!editable}
                            className={`w-full border px-3 py-2 rounded-md ${editable ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'} focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName || ''}
                            onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                            readOnly={!editable}
                            className={`w-full border px-3 py-2 rounded-md ${editable ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'} focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            readOnly={!editable}
                            className={`w-full border px-3 py-2 rounded-md ${editable ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'} focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username || ''}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            readOnly={!editable}
                            className={`w-full border px-3 py-2 rounded-md ${editable ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'} focus:outline-none`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            readOnly
                            className="w-full border px-3 py-2 rounded-md bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber || ''}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            readOnly={!editable}
                            className={`w-full border px-3 py-2 rounded-md ${editable ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'} focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob || ''}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            readOnly={!editable}
                            className={`w-full border px-3 py-2 rounded-md ${editable ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'} focus:outline-none`}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    {!editable ? (
                        <button
                            onClick={handleEdit}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
