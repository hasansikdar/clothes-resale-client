import React, { useContext, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/UserContext';
import IsAdmin from '../../../CustomHooks/IsAdmin';
import Modal from '../Modal/Modal';

const Product = ({ product, handleSendModalProduct, setOpenModal }) => {
    const {user} = useContext(AuthContext);

    const [role] = IsAdmin(user?.email)



    const { productImage, productName,condition, productCategory, productUsed, productDescription, currentTime, curretDate, productLocation, productOriginalPrice, userName, productSellingPrice, productPrice } = product;
    return (
        <div className="card product bg-base-100 shadow-xl">

            <PhotoProvider>
                <PhotoView src={productImage}>
                    <figure><img src={productImage} alt="Shoes" /></figure>
                </PhotoView>
            </PhotoProvider>

            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <span>Date: {curretDate} | Time: {currentTime}</span>
                <p>Original Price: ${productOriginalPrice}</p>
                <p>Selling Price: ${productSellingPrice}</p>
                <p>Seller Name: {userName}</p>
                <p>Product Loaction: {productLocation}</p>
                <p>Product Used: {productUsed}</p>
                <p>Product Condition: {condition}</p>
                <br></br>

                <p>{productDescription}</p>
                <div className="card-actions justify-end">
                    <label disabled={role?.role === 'seller' || role?.role === 'admin'} onClick={() => { handleSendModalProduct(product); setOpenModal(true) }} htmlFor="product-modal" className="btn btn-primary">Order Now</label>
                </div>
            </div>
        </div>
    );
};

export default Product;