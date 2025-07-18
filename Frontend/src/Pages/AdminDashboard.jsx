import React, { useState, useEffect } from 'react';
import AdminHeader from '../Components/adminComponents/AdminHeader';
import DataTable from '../Components/adminComponents/DataTable';
import ProductForm from '../Components/adminComponents/ProductForm';
import CategoryForm from '../Components/adminComponents/CategoryForm';
import {  fetchItems, deleteItem, addItem, editItem } from '../Services/Products/products';
import Pagination from '../Components/shared/Pagination';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [sdata, setsData] = useState([]);

  const [isProduct, setIsProduct] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
    const [paginationMeta, setPaginationMeta] = useState({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    });
    
  const getData = async () => {
          try {
            const items = await fetchItems(`${isProduct ? 'products' : 'category'}`, {
              page,         // NEW: current page
              limit: 10     // NEW: items per page
            });
        
            setData(items.data); // items.data = products array
            setPaginationMeta({
              currentPage: items.currentPage,
              totalPages: items.totalPages,
              totalItems: items.totalItems
            });
          } catch (error) {
            console.error(`Failed to fetch products`, error);
          }
        };

  // const edit = async (id) => {
  //   try {
  //     const items = await editProduct(isProduct ? 'products' : 'category', id);
  //     setsData(items);
  //   } catch (error) {
  //     console.error(`Failed to edit ${isProduct ? 'products' : 'category'}`, error);
  //   }
  // };


  const onEdit = async (item) => {
    try {
      setsData(item);
      setIsEdit(true);
      openModal();
    } catch (error) {
      console.error(`Failed to edit ${isProduct ? 'products' : 'category'}`, error);
    }
  };
  const submit = async (formData, resetForm) => {
    if (isEdit) {
      try {
        await editItem(isProduct ? 'products' : 'category', formData, sdata._id);
        await getData();
        if (resetForm) resetForm(); 
        closeModal(); 
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
    else {
      try {
        await addItem(isProduct ? 'products' : 'category', formData);
        await getData();
        if (resetForm) resetForm(); 
        closeModal(); 
      } catch (error) {
        console.error('Submission error:', error);
      }
    }

  };

  const delItem = async (id) => {
    try {
      await deleteItem(isProduct ? 'products' : 'category', id);
      await getData();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setIsEdit(false);
    setShowModal(false);

  }


  useEffect(() => {
    getData();
  }, [page,isProduct]);

  return (
    <>
      <AdminHeader
        isProduct={isProduct}
        setIsProduct={setIsProduct}
        openModal={openModal}
        getData={getData}
      />

      <DataTable
        isProduct={isProduct}
        
        onEdit={onEdit}
        data={data}
        onDelete={delItem}
      />

<Pagination page={page} setPage={setPage} paginationMeta={paginationMeta} ></Pagination>
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
    <div className="relative w-full max-w-3xl mx-4 sm:mx-6 md:mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]">
      
      <div className="overflow-y-auto max-h-[90vh] p-6">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold z-10"
        >
          &times;
        </button>

        {isProduct ? (
          <ProductForm
            isEdit={isEdit}
            data={sdata || null}
            onClose={closeModal}
            submit={submit}
          />
        ) : (
          <CategoryForm
            isEdit={isEdit}
            data={sdata || null}
            onClose={closeModal}
            submit={submit}
          />
        )}
      </div>
    </div>
  </div>
)}


       
    </>
  );
};

export default AdminDashboard;
