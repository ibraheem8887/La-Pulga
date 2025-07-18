import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white w-full mt-8">
            <div className="grid md:grid-cols-4 gap-8 px-6 py-10">


                <div>
                    <h2 className="text-xl font-bold mb-3">La Pulga</h2>
                    <p className="text-sm mb-2">
                        123 ABC Street,<br />
                        Faisalabad, Pakistan
                    </p>
                    <p className="text-sm">Email: support@lapulga.com</p>
                    <p className="text-sm">Phone: +92 300 1234567</p>
                </div>


                <div>
                    <h3 className="text-md font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Shop</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-md font-semibold mb-3">Newsletter</h3>
                    <p className="text-sm mb-2">Stay up to date with our offers!</p>
                    <form className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <button
                            type="submit"
                            className="bg-amber-400 hover:bg-amber-500 text-black py-2 px-4 text-sm rounded"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>


                <div>
                    <h3 className="text-md font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">

                        <a href="#" aria-label="Facebook" className="text-white hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 667 667" className="w-6 h-6 fill-current">
                                <path d="M445.2 334.4h-90v271h-108v-271h-57v-96h57v-58a111.1 111.1 0 0 1 112-112h82v96h-63a35 35 0 0 0-36 36v56h99z" />
                            </svg>
                        </a>


                        <a href="#" aria-label="X" className="text-white hover:text-sky-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" className="w-6 h-6 fill-current">
                                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284z" />
                            </svg>
                        </a>


                        <a href="#" className="text-white hover:text-pink-500" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM4.5 7.75a3.25 3.25 0 0 1 3.25-3.25h8.5a3.25 3.25 0 0 1 3.25 3.25v8.5a3.25 3.25 0 0 1-3.25 3.25h-8.5a3.25 3.25 0 0 1-3.25-3.25v-8.5Zm10.75 1.25a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.005a.75.75 0 0 1-.75-.75Zm-5.25 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


            <div className="bg-black border-t border-gray-700 text-gray-400 text-center py-4 text-sm">
                &copy; {new Date().getFullYear()} La Pulga. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
