import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ product }) => {
    const { image, productCategory, ProductName, ProductDescription } = product;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{ProductName}!</h2>
                <p>{ProductDescription}</p>
                <div className="card-actions justify-end">
                    <Link to={`/productCategory/${productCategory}`}><button className="btn btn-primary">See More</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Category;