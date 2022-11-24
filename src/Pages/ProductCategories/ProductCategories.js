import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../Shared/Product/Product';

const ProductCategories = () => {
    const products = useLoaderData();
    
    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='text-5xl text-center '>Products Category {products?.length}</h1>

            <div className='grid product mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products.map(product => <Product key={product?._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;