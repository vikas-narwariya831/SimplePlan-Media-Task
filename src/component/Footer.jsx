import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-12 mt-auto">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">MyStore</h4>
                        <p className="text-sm">
                            Explore the best products tailored to your needs. Quality and satisfaction guaranteed.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:text-gray-100 transition">Home</a>
                            </li>
                            <li>
                                <a href="/products" className="hover:text-gray-100 transition">Products</a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-gray-100 transition">About Us</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-gray-100 transition">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-blue-600 text-white p-3 rounded-full"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-blue-400 text-white p-3 rounded-full"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-pink-500 text-white p-3 rounded-full"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-blue-700 text-white p-3 rounded-full"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Stay Updated</h4>
                        <p className="text-sm mb-4">
                            Subscribe to our newsletter to get the latest updates and exclusive offers.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-l-lg text-gray-700 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-[#C13515] text-white px-6 py-2 rounded-r-lg hover:bg-[#7E2810] transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} MyStore. All Rights Reserved.</p>
                    <ul className="flex space-x-6 mt-4 md:mt-0">
                        <li>
                            <a href="/" className="hover:text-gray-100 transition">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gray-100 transition">Terms of Service</a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gray-100 transition">FAQs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
