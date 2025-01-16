import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { IoBagCheckSharp } from "react-icons/io5";
import { BsCartCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS

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
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col w-full max-w-5xl gap-12 mx-auto md:flex-row">
                    {/* Skeleton for Image */}
                    <div className="flex-1">
                        <Skeleton height={400} />
                    </div>

                    <div className="flex flex-col flex-1 space-y-4">
                        {/* Skeleton for Title */}
                        <Skeleton height={40} width="80%" />

                        {/* Skeleton for Rating */}
                        <Skeleton height={30} width="50%" />

                        {/* Skeleton for Price */}
                        <Skeleton height={30} width="30%" />

                        {/* Skeleton for Description */}
                        <Skeleton count={4} height={20} />
                    </div>
                </div>
            </div>
        );
    }

    const discountedPrice = product.price - product.price * 0.2;

    return (
        <>
            <Navbar />
            <div className="px-4 py-12 mx-auto bg-gradient-to-r">
                <div className="flex flex-col gap-12 md:flex-row">
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative p-6 bg-white shadow-xl rounded-xl">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="object-contain w-full rounded-lg h-96"
                            />
                            <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full top-4 left-4">
                                20% OFF
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex flex-col flex-1">
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
                            <span className="ml-2 text-sm text-gray-500">
                                ({product.rating.count} reviews)
                            </span>
                        </div>

                        <div className="mt-6">
                            <span className="text-3xl font-bold text-[#C13515]">
                                ${discountedPrice.toFixed(2)}
                            </span>
                            <span className="ml-4 text-lg text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <p className="mt-8 leading-relaxed text-gray-600">
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
                                className="flex items-center gap-2 px-8 py-3 text-white transition transform rounded-lg shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105"
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
