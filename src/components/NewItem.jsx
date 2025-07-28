import React, { useState, useRef } from 'react';

const NewItem = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    itemName: '',
    itemPrice: '',
    rating: '',
    imageUrl: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleRatingChange = (val) => {
    setForm(prev => ({ ...prev, rating: val }));
    setErrors(prev => ({ ...prev, rating: undefined }));
  };


  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm(prev => ({ ...prev, imageUrl: reader.result }));
        setErrors(prev => ({ ...prev, imageUrl: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = () => {
    const { itemName, itemPrice, imageUrl, rating, description } = form;
    const newErrors = {};

    if (!itemName) newErrors.itemName = "Item name is required.";
    if (!itemPrice && itemPrice !== 0) newErrors.itemPrice = "Price is required.";
    else if (itemPrice < 0) newErrors.itemPrice = "Price cannot be negative.";
    if (!imageUrl) newErrors.imageUrl = "Image is required.";
    if (!description) newErrors.description = "Description is required.";
    if (rating === '') newErrors.rating = "Rating is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newItem = {
      itemID: Date.now(),
      itemName,
      itemPrice: parseFloat(itemPrice),
      imageUrl,
      rating: parseInt(rating),
      itemDescription: description,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-green-700">Add New Menu Item</h2>

        <label className="block text-gray-700 font-medium mb-1" htmlFor="itemName">Item Name</label>
        <input
          id="itemName"
          name="itemName"
          placeholder="Enter item name"
          onChange={handleChange}
          value={form.itemName}
          className="w-full border mb-1 p-2 rounded"
        />
        {errors.itemName && <p className="text-red-500 text-sm mb-2">{errors.itemName}</p>}


        <label className="block text-gray-700 font-medium mb-1" htmlFor="itemPrice">Item Price (₹)</label>
        <input
          id="itemPrice"
          name="itemPrice"
          placeholder="Enter price"
          type="number"
          min="0"
          onChange={handleChange}
          value={form.itemPrice}
          className="w-full border mb-1 p-2 rounded"
        />
        {errors.itemPrice && <p className="text-red-500 text-sm mb-2">{errors.itemPrice}</p>}


        <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter item description"
          rows={3}
          onChange={handleChange}
          value={form.description}
          className="w-full border mb-1 p-2 rounded"
        />
        {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

        <label className="block text-gray-700 font-medium mb-1">Item Image</label>
        <div
          className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center mb-1 cursor-pointer bg-gray-50 hover:bg-gray-100 h-40 flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
        >
          {form.imageUrl ? (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <p className="text-gray-500">Drag & drop image here or click to upload</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
        {errors.imageUrl && <p className="text-red-500 text-sm mb-2">{errors.imageUrl}</p>}


        <label className="text-gray-700 font-medium block mb-1">Rating</label>
        <div className="flex gap-4 justify-between mb-1">
          {[1, 2, 3, 4, 5].map((val) => (
            <label key={val} className="flex items-center space-x-1 text-sm">
              <input
                type="radio"
                name="rating"
                value={val}
                checked={form.rating === val}
                onChange={() => handleRatingChange(val)}
                className="accent-green-600"
              />
              <span>{val}</span>
            </label>
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-sm mb-2">{errors.rating}</p>}


        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
