import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCategories from '../../ProductCategories/ProductCategories';
import Modal from '../../Shared/Modal/Modal';
import Product from '../../Shared/Product/Product';

const Advertise = () => {
    const [productModal, setProdcutModal] = useState({});
    const [opentModal, setOpenModal] = useState(false);

    const { data: advertiseProducts = [], refetch } = useQuery({
        queryKey: ['advertiseProduct'],
        queryFn: async () => {
            const res = await fetch(`https://resale-clothes.vercel.app/advertiseProducts`);
            const data = res.json();
            return data;
        }
    })


    const handleSendModalProduct = product => {
        setProdcutModal(product);
    }





    return (
        <div className='my-10 '>
            {advertiseProducts.length === 1 &&
                <>
                <h1 className='text-center text-5xl'>Product Advertise</h1>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-14'>
                    {
                        advertiseProducts.map(product => <Product setOpenModal={setOpenModal} key={product?._id} product={product} handleSendModalProduct={handleSendModalProduct} ></Product>)
                    }
                </div>
                {opentModal && <Modal refetch={refetch} setOpenModal={setOpenModal} productModal={productModal}></Modal>}
            </>}
        </div>
    );
};

export default Advertise;