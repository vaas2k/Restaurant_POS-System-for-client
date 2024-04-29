'use client'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AddMenuItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    available: false,
    cookingTime: '',
    image: null,
  });
  console.log(formData);

  const { name, description, category, price, available, cookingTime, image } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData,image : reader.result});
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-items', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Item added successfully!'); // Show success toast
        // Reset form data
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
          available: false,
          cookingTime: '',
          image: null,
        });
      } else {
        toast.error('Error adding item. Please try again.'); // Show error toast
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('An unexpected error occurred. Please try again later.'); // Show generic error toast
    }
  };

  return (
    <div className="flex items-center justify-center gap-[120px]">
      <div className=" bg-white flex flex-col justify-center items-center">
        <div className="max-w-lg w-[500px] mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit} className='w-full'>
        <div className="form-group mb-3">
          <label className="form-label block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            name="name"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleChange}
            name="description"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label block text-gray-700" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleChange}
            name="category"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label block text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handleChange}
            name="price"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group mb-3 flex items-center">
          <label className="form-label block text-gray-700 mr-2" htmlFor="available">
            Available
          </label>
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={handleChange}
            name="available"
            className="h-5 w-5 rounded-full border border-gray-300 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label block text-gray-700" htmlFor="cookingTime">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            value={cookingTime}
            onChange={handleChange}
            name="cookingTime"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group mb-3 flex items-center">
          <label className="form-label block text-gray-700 mr-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="image" className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded inline-block focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-blue-50 cursor-pointer">
            Choose Image
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-50"
        >
          Submit
        </button>
      </form>
        </div>
      </div>
      {image && (
        <div className="w-1/2 bg-gray-200 flex justify-center items-center">
          <img src={image} alt="Selected" className="max-h-96" />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddMenuItem;
