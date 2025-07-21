import React, { useState } from 'react';
import Search from "./Search";
import { useNavigate } from 'react-router-dom';


const Header = ({ setCategoryFilter, categories=[] , search, setSearch }) => {

    const [isClicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const abc = () => {

        navigate('/login');
    }
    return (
        <div className='bg-white grid h-30 '>
            <div className=''>
                <marquee className="bg-black text-white" behavior="scroll" direction="left">La Pulga </marquee>
            </div>

            <div className='grid'>
                <div className="w-full p-4 bg-white ">

                    <div>
                        <p className="text-center font-bold font-serif text-3xl">LA PULGA</p>
                    </div>

                    <div>
                        <div className="grid grid-cols-3 justify-between items-center mt-4">
                            <div></div>
                            <div className="flex justify-center space-x-6">
                                <a href="#" onClick={(e) => { e.preventDefault(); alert("new arrivals"); }} className="text-red-600  whitespace-nowrap">New Arrivals</a>

                                {categories.map((category, index) => (
                                    <div key={index}>                                <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter(category._id); console.log(category._id) }} className="text-black  whitespace-nowrap">{category.name}</a>
                                    </div>
                                ))}

                                <a href="#" onClick={(e) => { e.preventDefault(); setCategoryFilter('');  }} className="whitespace-nowrap hover:text-purple-500 transition">All Categories</a>
<button onClick={abc} className="text-blue-600 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer">
  Admin
</button>
                            </div>



                            <div className=' grid grid-cols-2 justify-end items-center  transition-all '>

                                <button onClick={() => setClicked(!isClicked)} className='grid justify-end h-auto min-w-auto'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-3 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-4.35-4.35m1.57-5.07a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                                        />
                                    </svg>
                                </button>

                                {isClicked ? <Search setSearch={setSearch} search={search}></Search> : ""}

                            </div>
                        </div>
                    </div>

                </div>




            </div>
        </div>
    );
}

export default Header;
