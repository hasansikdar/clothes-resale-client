import React from 'react';

const OrderRow = ({order, deleteOrder}) => {
    const {productImage, productName,productPrice,mettingLocation,userOrderEmail,phoneNumber, _id } = order;

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => deleteOrder(_id)} className='text-red-500 btn'>X</button>
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
                        <div className="text-sm opacity-50">{mettingLocation}</div>
                    </div>
                </div>
            </td>
            <td>
                {userOrderEmail}
                <br />
                <span className="badge badge-ghost badge-sm">{phoneNumber}</span>
            </td>
            <td>${productPrice}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default OrderRow;