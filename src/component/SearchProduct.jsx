import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // To access URL query
import { FaStar, FaHeart } from "react-icons/fa";
import { motion } from 'framer-motion';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Navbar from './Navbar';

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [favorites, setFavorites] = useState([]); // To track favorite products
    const location = useLocation(); // Get the location object
    const searchQuery = new URLSearchParams(location.search).get('query'); // Extract the query from URL

    console.log('search', searchQuery);

    useEffect(() => {
        // Fetch the products data from the search.json file
        const fetchProducts = async () => {
            try {
                const response = await fetch('/src/store/SearchData/search.json'); // Path to your search.json file
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const results = products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products); // If no search query, show all products
        }
    }, [searchQuery, products]);

    // Add or remove a product from favorites
    const toggleFavorite = (productId) => {
        setFavorites(prevFavorites =>
            prevFavorites.includes(productId)
                ? prevFavorites.filter(id => id !== productId)
                : [...prevFavorites, productId]
        );
    };

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
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="text-center mb-8 mt-10">
                    <h1 className="text-4xl font-semibold text-gray-900">Search Results</h1>
                    <p className="text-gray-600 mt-2">Showing results for: "{searchQuery || "All Products"}</p>
                </div>

                {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500">No products found</p>
                ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                >
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
                                        <button className="mt-4 bg-indigo-500 text-white w-full py-2 rounded-lg hover:bg-indigo-600">
                                            Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchProduct;
