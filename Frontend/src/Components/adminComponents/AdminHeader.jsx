import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ openModal, isProduct, setIsProduct, getData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className="bg-white grid  border-b">
        <div className="grid">
          <div className="w-full p-4 bg-white">
            <div className="grid space-y-4.5">
              <div className="grid grid-cols-2 p-4 bg-black text-white items-center">
                <div className="flex space-x-3 text-2xl items-center">
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-white hover:text-gray-300 focus:outline-none"
                    >
                      &#9776;
                    </button>

                    {isOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-white text-black shadow-lg rounded-lg z-30 border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out">
                        <button
                          className="block px-5 py-3 text-base hover:bg-gray-100 font-medium"
                          onClick={() => {
                            if (isProduct !== false) {
                              setIsProduct(false);
                              getData();
                            }
                            setIsOpen(false);
                          }}
                        >
                          Manage Categories
                        </button>
                        <button
                          className="block px-5 py-3 text-base hover:bg-gray-100 font-medium"
                          onClick={() => {
                            if (isProduct !== true) {
                              setIsProduct(true);
                              getData();
                            }
                            setIsOpen(false);
                          }}
                        >
                          Manage Products
                        </button>
                      </div>
                    )}

                  </div>
                  <p className="font-bold font-serif text-3xl">LA PULGA</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={openModal}
                    className="bg-black text-black- px-4 py-2 rounded hover:bg-black-200"

                  >
                    {isProduct ? "Add Product" : "Add Category"

                    }
                  </button>                 
                 <button className="text-white hover:text-gray-300" onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminHeader;
