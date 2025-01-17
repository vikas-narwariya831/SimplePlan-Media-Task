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
            <div className="container px-4 mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                    <p className="mt-2 text-gray-500">Find the best products curated just for you</p>
                </div>

                <div className="flex justify-between gap-6 mb-6">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Sort</option>

                        <option value="asc" >Price: High to Low</option>
                        <option value="desc" >Price: Low to High</option>
                    </select>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* Skeleton Loader for Products */}
                        {Array(6).fill(0).map((_, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }} className="overflow-hidden bg-white rounded-lg shadow-md">
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
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.05 }}
                                className="relative overflow-hidden bg-white rounded-lg shadow-md" // Add relative positioning
                            >
                                <Link to={`/product-details/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="object-contain w-full h-56 p-4"
                                    />
                                </Link>
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute text-xl text-red-500 top-2 right-2"
                                >
                                    {wishlistStatus[product.id] ? <MdFavorite /> : <MdFavoriteBorder />}
                                </button>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.title}</h2>
                                    <div className="flex items-center mt-2">
                                        {renderStars(product.rating.rate)}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <div className="flex items-center justify-between mt-4">
                                        <button className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
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
