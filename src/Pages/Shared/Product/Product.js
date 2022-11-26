import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';

const Product = ({product, handleSendModalProduct}) => {

    const {productImage, productName, productCategory,productUsed, productDescription,currentTime,curretDate,productLocation,productOriginalPrice,userName,productSellingPrice, productPrice} = product;
    return (
        <div className="card product bg-base-100 shadow-xl">
            <figure><img src={productImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <span>Date: {curretDate} | Time: {currentTime}</span>
                <p>Original Price: ${productOriginalPrice}</p>
                <p>Selling Price: ${productSellingPrice}</p>
                <p>Seller Name: ${userName}</p>
                <p>Product Loaction: ${productLocation}</p>
                <p>Product Used: {productUsed}</p>
                <br></br>

                <p>{productDescription}</p>
                <div className="card-actions justify-end">
                    <label onClick={() => handleSendModalProduct(product)} htmlFor="product-modal" className="btn btn-primary">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default Product;