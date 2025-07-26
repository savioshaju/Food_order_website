import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [login, setlogin] = useState(false);
  const navigate = useNavigate()
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!matchedUser) {
      setErrors({ email: 'Invalid email or password' });
      return;
    }
    setlogin(true)
    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    localStorage.setItem('status', 'true');

    console.log('Logged in as:', matchedUser);
    setTimeout(() => {
      setlogin(false)
      navigate('/');
    }, 1500);
  };


  return (
    <div className="bg-green-100 flex items-center justify-center min-h-screen pt-20">
      <div className="w-full bg-green-100 max-w-3xl px-4 py-6">
        <div className="bg-white shadow-xl border border-green-300 p-8 rounded-2xl">
          <h2 className="text-center text-xl uppercase font-semibold mb-6">Log IN</h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Log In
            </button>
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div >
      {login && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Logged in successfully!
        </div>
      )}
    </div >
  );
};




export default LoginPage