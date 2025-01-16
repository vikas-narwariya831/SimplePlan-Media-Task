import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdFavorite } from "react-icons/md"; // Heart icon for favorites

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track mobile menu visibility
    const [favoriteCount, setFavoriteCount] = useState(0); // Track favorite count
    const navigate = useNavigate();

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search submit
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?query=${searchQuery}`);
        }
    };

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to get the count of favorite products from localStorage
    const getFavoriteCount = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
        return Object.keys(wishlist).length; // Count how many products are in the wishlist
    };

    // Effect hook to set the favorite count when the component mounts or updates
    useEffect(() => {
        const count = getFavoriteCount();
        setFavoriteCount(count); // Update the favorite count on mount
    }, []);

    // Function to manually update favorite count
    const updateFavoriteCount = () => {
        const count = getFavoriteCount();
        setFavoriteCount(count); // Update the count dynamically
    };

    // Effect to listen for changes in localStorage and update the favorite count
    useEffect(() => {
        const interval = setInterval(updateFavoriteCount, 1000); // Update every 1 second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <nav className="bg-gradient-to-r from-[#FF6B6B] to-[#C13515] text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold tracking-wide">
                    My<span className="text-yellow-300">Store</span>
                </Link>

                {/* Mobile Hamburger Icon */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden lg:flex space-x-8 text-lg font-medium">
                    <li>
                        <Link to="/" className="hover:text-yellow-300 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="hover:text-yellow-300 transition-colors">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-yellow-300 transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-yellow-300 transition-colors">
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Desktop Search Input */}
                <div className="hidden lg:block">
                    <div className="relative w-full max-w-lg">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center bg-gray-100 border border-gray-300 rounded-full shadow-md hover:shadow-lg focus-within:shadow-lg transition-shadow duration-300 px-4 py-2"
                        >
                            <input
                                type="text"
                                placeholder="Search for products, categories..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="flex-grow bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:placeholder-gray-400 px-2 text-sm"
                            />
                            <button
                                type="submit"
                                className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transform hover:scale-105 transition-transform duration-200"
                            >
                                <FaSearch size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Heart Icon for Favorites with Count (Desktop only) */}
                <div className="relative hidden lg:block">
                    <Link to="/favorites">
                        <MdFavorite
                            size={30}
                            className="text-white hover:text-yellow-300 transition-colors"
                        />
                        {favoriteCount > 0 && (
                            <span className="absolute top-0 right-0 inline-block text-xs font-semibold bg-red-600 text-white rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                                {favoriteCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Links and Search */}
            <div
                className={`lg:hidden bg-[#FF6B6B] text-white shadow-md absolute top-0 left-0 w-full transition-transform duration-300 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="p-4">
                    {/* Close Button inside mobile menu */}
                    <button
                        onClick={toggleMenu}
                        className="text-white text-xl absolute top-4 right-4"
                    >
                        <FaTimes size={24} />
                    </button>

                    <ul className="space-y-4 text-center text-lg font-medium">
                        <li>
                            <Link to="/" className="hover:text-yellow-300 block">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className="hover:text-yellow-300 block"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-yellow-300 block"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-yellow-300 block"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorites"
                                className="hover:text-yellow-300 block"
                            >
                                Favorites
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full max-w-lg">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex items-center bg-gray-100 border border-gray-300 rounded-full shadow-md hover:shadow-lg focus-within:shadow-lg transition-shadow duration-300 px-4 py-2"
                    >
                        <input
                            type="text"
                            placeholder="Search for products, categories..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="flex-grow bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:placeholder-gray-400 px-2 text-sm"
                        />
                        <button
                            type="submit"
                            className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transform hover:scale-105 transition-transform duration-200"
                        >
                            <FaSearch size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
