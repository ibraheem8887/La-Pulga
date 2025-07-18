import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addItem } from '../../Services/Products/products';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Category name is required')
    .min(3, 'Minimum 3 characters')
    .max(30, 'Maximum 30 characters'),
  description: yup.string().optional(),
});

const CategoryForm = ({ data,isEdit , onClose , submit }) => {
  


  const {
    register,
    handleSubmit,
    reset,
    watch ,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
   
  });
  const descriptionValue = watch("description");

  
  const onSubmit = async (data) => {
    submit(data);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{isEdit ? 'Update Category ': 'Add New Category'}</h2>

       

        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Category Name*
          </label>
          <input
            {...register('name')}
            className={`border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={isEdit ? undefined : "Enter category name"}
            defaultValue={isEdit ? data.name : undefined} // Initial value only

          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            className="border border-gray-300 rounded px-3 py-2"
            rows={3}
          
            defaultValue={isEdit ? data.description : undefined} 
            placeholder={isEdit ? undefined : "Enter category description"}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${   'bg-blue-600 hover:bg-blue-700'}`}
          >
            
             
               
              
             
            {isEdit ? 'Update': 'Add'}
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;