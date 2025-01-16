import React, { useState, useEffect } from 'react';
import { MdFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';  // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css';

const Favorites = () => {
    const [products, setProducts] = useState([]);
    const [wishlistStatus, setWishlistStatus] = useState({}); // Track wishlist status
    const [loading, setLoading] = useState(true);  // Track loading state

    // Load wishlist from localStorage
    const loadWishlistFromLocalStorage = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
        setWishlistStatus(savedWishlist);
    };

    // Fetch all products
    const fetchProducts = async () => {
        let url = 'https://fakestoreapi.com/products';

        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
            setLoading(false);  // Set loading to false after products are fetched
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);  // Set loading to false even in case of an error
        }
    };

    useEffect(() => {
        loadWishlistFromLocalStorage(); // Load wishlist status when component mounts
        fetchProducts();
    }, []);

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

    // Filter products that are in the wishlist
    const favoriteProducts = products.filter(product => wishlistStatus[product.id]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 h-screen">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Your Favorite Products</h1>
                    <p className="text-gray-500 mt-2">Here are the products you’ve added to your favorites</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Skeleton Loader for Products */}
                        {Array(6).fill(0).map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <Skeleton height={200} width="100%" />
                                <div className="p-4">
                                    <Skeleton height={20} width="70%" />
                                    <Skeleton height={15} width="40%" className="mt-2" />
                                    <Skeleton height={20} width="100%" className="mt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoriteProducts.length > 0 ? (
                            favoriteProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <Link to={`/product-details/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-56 w-full object-contain p-4"
                                        />
                                    </Link>
                                    <div className="p-4">
                                        <h2 className="font-semibold text-gray-800 text-lg line-clamp-1">{product.title}</h2>
                                        <div className="flex items-center mt-2">
                                            {renderStars(product.rating.rate)}
                                        </div>
                                        <p className="text-gray-500 text-sm mt-2">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center col-span-4">
                                <p className="text-gray-500 text-lg">You have no favorite products yet!</p>
                            </div>
                        )}
                    </div>
                )}

                <ToastContainer />
            </div>
            <Footer />
        </>
    );
};

export default Favorites;
