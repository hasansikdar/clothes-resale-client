import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Product from '../../Shared/Product/Product';

const Products = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false)
            })
    }, [])
    
    return (
        <div className='py-10'>
            {loading ?
                <div className='text-center'>
                    <button className="btn loading">loading</button>
                </div>

                :
                <><h1 className='text-5xl text-center'>Products {products.length}</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-20'>
                        {
                            products.map(product => <Product key={product?._id} product={product}></Product>)
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default Products;