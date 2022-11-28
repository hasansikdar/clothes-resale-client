import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Category from './Category/Category';
import Product from '../Shared/Product/Product';
import Modal from '../Shared/Modal/Modal';

const ProductCategories = () => {
    const products = useLoaderData();
    const [productModal, setProdcutModal] = useState({});
    const [opentModal, setOpenModal] = useState(false);

    const handleSendModalProduct = product => {
        setProdcutModal(product);
    }
    

    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='text-5xl text-center '>Avalaibale Products {products?.length}</h1>

            <div className='grid product mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products.map(product => <Product setOpenModal={setOpenModal} handleSendModalProduct={handleSendModalProduct} key={product?._id} product={product}></Product>)
                }
            </div>
            {opentModal && <Modal setOpenModal={setOpenModal} productModal={productModal}></Modal>}
        </div>
    );
};

export default ProductCategories;