import React, { useState } from 'react';
import toast from 'react-hot-toast';

const MyProductRow = ({ product, deleteMyProduct, refetch }) => {
    const { productImage, advertise, productName, productSellingPrice, curretDate, currentTime, productLocation, userEmail, productCategory, _id } = product;
    const [loading, setLoading] = useState(true);

    const handleProductAdvertise = id => {
        const agree = window.confirm('Are you sure you want to advertise your product');

        if (agree) {
            setLoading(true);
            fetch(`https://resale-clothes.vercel.app/dashboard/my-products/${id}`, {
                method: 'PUT',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        toast.success('Product Advertise in Home Page');
                        refetch();
                        setLoading(false);
                    }
                })
        }
    }



    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => deleteMyProduct(_id)} className='text-red-500 btn'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={productImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{productName}</div>
                        <div className="text-sm opacity-50">{productLocation}</div>
                    </div>
                </div>
            </td>
            <td>
                {curretDate}, {currentTime}
                <br />
                <span className="badge badge-ghost badge-sm">Category {productCategory}</span>
            </td>
            <td>${productSellingPrice}</td>
            <th>
                {advertise !== 'advertise' && <button onClick={() => handleProductAdvertise(_id)} className="btn btn-ghost btn-xs">Advertise</button>}
            </th>
        </tr>
    );
};

export default MyProductRow;