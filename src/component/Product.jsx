import React, { useState, useEffect } from 'react';
import { IoBagCheckSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { motion } from 'framer-motion';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Skeleton from 'react-loading-skeleton';  // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [wishlistStatus, setWishlistStatus] = useState({}); // Track wishlist status
 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading state


    // Load wishlist from localStorage
    const loadWishlistFromLocalStorage = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
        setWishlistStatus(savedWishlist);
    };

    // Toggle wishlist status
    const toggleWishlist = (productId) => {
        const updatedWishlist = { ...wishlistStatus };
        if (updatedWishlist[productId]) {
            delete updatedWishlist[productId]; // Remove from wishlist
        } else {
            updatedWishlist[productId] = true; // Add to wishlist
        }
        setWishlistStatus(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Save to localStorage
    };

    const fetchProducts = async (category = '', sort = '') => {
        let url = 'https://fakestoreapi.com/products';

        if (category) {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        // Assuming the API supports sorting via query parameters like `sort=asc` or `sort=desc`
        if (sort) {
            url += `?sort=${sort}`;  // Appending the sort parameter to the URL
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            // No need to sort here if the API handles it
            setProducts(data);
            setLoading(false);  // Set loading to false after products are fetched
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);  // Set loading to false even in case of an error
        }
    };


    const fetchCategory = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            const uniqueCategories = [...new Set(data.map((product) => product.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        loadWishlistFromLocalStorage(); // Load wishlist status when component mounts
        fetchCategory();
    }, []);

    useEffect(() => {
        fetchProducts(selectedCategory, sortOrder);
    }, [selectedCategory, sortOrder]);



    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <>
                {Array(fullStars).fill(<FaStar className="text-[#FFA41C]" />)}
                {hasHalfStar && <FaStar className="text-[#FFA41C] opacity-50" />}
                {Array(emptyStars).fill(<FaStar className="text-gray-300" />)}
            </>
        );
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                    <p className="text-gray-500 mt-2">Find the best products curated just for you</p>
                </div>

                <div className="flex justify-between gap-6 mb-6">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-3 border rounded-lg shadow-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-3 border rounded-lg shadow-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Sort</option>

                        <option value="desc">Price: High to Low</option>
                        <option value="asc">Price: Low to High</option>
                    </select>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Skeleton Loader for Products */}
                        {Array(6).fill(0).map((_, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <Skeleton height={200} width="100%" />
                                <div className="p-4">
                                    <Skeleton height={20} width="70%" />
                                    <Skeleton height={15} width="40%" className="mt-2" />
                                    <Skeleton height={20} width="100%" className="mt-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden relative" // Add relative positioning
                            >
                                <Link to={`/product-details/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-56 w-full object-contain p-4"
                                    />
                                </Link>
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute top-2 right-2 text-red-500 text-xl"
                                >
                                    {wishlistStatus[product.id] ? <MdFavorite /> : <MdFavoriteBorder />}
                                </button>
                                <div className="p-4">
                                    <h2 className="font-semibold text-gray-800 text-lg line-clamp-1">{product.title}</h2>
                                    <div className="flex items-center mt-2">
                                        {renderStars(product.rating.rate)}
                                    </div>
                                    <p className="text-gray-500 text-sm mt-2">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 w-full">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <ToastContainer />
            </div>
            <Footer />
        </>
    );
};

export default Products;
