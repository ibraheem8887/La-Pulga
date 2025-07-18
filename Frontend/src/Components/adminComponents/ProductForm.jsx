import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fetchItems } from '../../Services/Products/products';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required').min(3).max(45),
  description: yup.string().optional(),
  price: yup.number().typeError('Price must be a number').required().positive(),
  sku: yup.number().typeError('SKU must be a number').required().integer(),
  category: yup.string().required('Category is required'),
});

const ProductForm = ({ data, isEdit, onClose, submit }) => {
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchItems('category');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 2 || files.length > 5) {
      setError('images', {
        type: 'manual',
        message: 'Please select between 2 to 5 images.',
      });
      return;
    }

    setSelectedImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (formData) => {
    try {
      if (selectedImages.length < 2 || selectedImages.length > 5) {
        setError('images', {
          type: 'manual',
          message: 'Please select between 2 to 5 images.',
        });
        return;
      }

      const uploadData = new FormData();
      selectedImages.forEach((file) => uploadData.append('images', file));

      const res = await fetch('http://localhost:4000/products/upload-images', {
        method: 'POST',
        body: uploadData,
      });

      const { imageUrls } = await res.json();

      const finalData = {
        ...formData,
        images: imageUrls,
      };

      submit(finalData, reset);
      setSelectedImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Update Product' : 'Add New Product'}
        </h2>

        {/* Name */}
        <div>
          <label className=" text-sm font-medium text-gray-700">Product Name*</label>
          <input
            {...register('name')}
            className={`mt-1 w-full px-4 py-2 rounded-md border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            defaultValue={isEdit ? data.name : ''}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300"
            defaultValue={isEdit ? data.description : ''}
          />
        </div>

        {/* Price and SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price*</label>
            <input
              type="number"
              step="0.01"
              {...register('price')}
              className={`mt-1 w-full px-4 py-2 rounded-md border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              defaultValue={isEdit ? data.price : ''}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SKU*</label>
            <input
              type="number"
              {...register('sku')}
              className={`mt-1 w-full px-4 py-2 rounded-md border ${
                errors.sku ? 'border-red-500' : 'border-gray-300'
              }`}
              defaultValue={isEdit ? data.sku : ''}
            />
            {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category*</label>
          <select
            {...register('category')}
            className={`mt-1 w-full px-4 py-2 rounded-md border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
            defaultValue={isEdit ? data.category : ''}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Images (2–5)*
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className={`mt-1 w-full px-4 py-2 rounded-md border ${
              errors.images ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
              {imagePreviews.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`preview-${i}`}
                  className="w-full h-20 object-cover border rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
