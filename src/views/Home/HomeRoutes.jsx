import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductDetails from '../../component/ProductDetails';
import SearchProduct from '../../component/SearchProduct';
import Favorites from '../../component/Favorites';
function HomeRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/products' element={<SearchProduct/>} />

            <Route path="/favorites" element={<Favorites/>} />






        </Routes>
    )
}

export default HomeRoutes