import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { IoBagCheckSharp } from "react-icons/io5";
import { BsCartCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        console.log("Added to cart:", product);
    };

    const handleBuyNow = () => {
        console.log("Proceeding to buy now:", product);
        navigate("/checkout");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse">
                    <div className="w-72 h-72 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        );
    }

    const discountedPrice = product.price - product.price * 0.2;

    return (
        <>
            <Navbar />
            <div className="mx-auto px-4 py-12 bg-gradient-to-r">
                <div className="flex flex-col md:flex-row gap-12">
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative bg-white rounded-xl shadow-xl p-6">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-96 object-contain rounded-lg"
                            />
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                20% OFF
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex-1 flex flex-col">
                        <motion.h1
                            className="text-4xl font-extrabold text-gray-800"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {product.title}
                        </motion.h1>

                        <div className="flex items-center mt-4">
                            <Rating
                                name="product-rating"
                                value={product.rating.rate}
                                precision={0.5}
                                readOnly
                                className="text-yellow-400"
                            />
                            <span className="ml-2 text-gray-500 text-sm">
                                ({product.rating.count} reviews)
                            </span>
                        </div>

                        <div className="mt-6">
                            <span className="text-3xl font-bold text-[#C13515]">
                                ${discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-gray-500 text-lg line-through ml-4">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <p className="mt-8 text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-6 mt-8">
                            <motion.button
                                onClick={handleAddToCart}
                                className="flex items-center gap-2 px-8 py-3 bg-[#C13515] text-white rounded-lg shadow-md hover:bg-[#7E2810] transition transform hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IoBagCheckSharp className="text-xl" />
                                Add to Cart
                            </motion.button>

                            <motion.button
                                onClick={handleBuyNow}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition transform hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <BsCartCheckFill className="text-xl" />
                                Buy Now
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
