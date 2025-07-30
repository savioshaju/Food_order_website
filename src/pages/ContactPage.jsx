import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleReset = () => {
    if (confirm("Do you really want to clear?")) {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (confirm("Do you really want to submit?")) {
      alert("Message Submitted");
    }
  };

  return (
    <div className='w-full min-h-screen pt-24 bg-green-100 pb-16'>
      <div className='w-full flex justify-center items-center'>
        <div className='text-green-500 text-3xl font-bold'>Contact Us</div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="number"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
