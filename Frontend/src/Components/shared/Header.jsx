import React, { useState } from 'react';
import Search from "./Search";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';


const Header = ({ setCategoryFilter, categories = [], search, setSearch }) => {
    const [isClicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/login');
    };
    return (
        <div className="bg-white border-b">
            {/* Top Bar */}
            <div className="bg-black text-white py-2">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <marquee className="text-sm">Free shipping on orders over $100</marquee>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Logo */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-serif text-gray-900">LA PULGA</h1>
                </div>

                {/* Navigation & Actions */}
                <div className="flex items-center justify-between">
                    {/* Left spacer */}
                    <div className="w-32"></div>

                    {/* Center Navigation */}
                    <nav className="flex space-x-8">
                        <button
                            onClick={(e) => { e.preventDefault(); alert("new arrivals"); }}
                            className="text-red-500 font-medium hover:text-red-600 transition-colors"
                        >
                            New Arrivals
                        </button>

                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCategoryFilter(category._id);
                                }}
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                {category.name}
                            </button>
                        ))}

                        <button
                            onClick={(e) => { e.preventDefault(); setCategoryFilter(''); }}
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            All Categories
                        </button>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4 w-32 justify-end">
                        {/* Search */}
                        <div className="relative">
                            <button
                                onClick={() => setClicked(!isClicked)}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FaSearch className="w-5 h-5" />
                            </button>

                            {isClicked && (
                                <div className="absolute right-0 top-full mt-2 w-52 bg-white border rounded-lg shadow-lg p-3 z-50">
                                    Search
                                    <Search setSearch={setSearch} search={search} />
                                </div>
                            )}
                        </div>


                        <button
                            onClick={handleAdminLogin}
                            className="ml-6 mr-0 flex items-center gap-2 px-6 py-2.5  text-sm "
                        >
                            <FaShieldAlt className="text-back text-base" />
                            Admin
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
