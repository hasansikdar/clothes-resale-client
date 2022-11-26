import React from 'react';

const MyProductRow = ({ product, deleteMyProduct }) => {
    const { productImage, productName, productSellingPrice, curretDate, currentTime, productLocation, userEmail, productCategory, _id } = product;

    console.log(product)
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
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default MyProductRow;