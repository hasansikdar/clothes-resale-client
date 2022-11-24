import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
    

    const {productImage, productName, productCategory} = product;
    return (
        <div className="card product bg-base-100 shadow-xl">
            <figure><img src={productImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <h2 className="card-title">{productCategory}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Link to={`/productCategory/${productCategory}`}><button className="btn btn-primary">See More</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Product;