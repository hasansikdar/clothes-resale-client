import React from 'react';

const MyBuyersRow = ({myBuyer, deleteOrder}) => {
    const {userPhoto,productName, username,productPrice,mettingLocation,userOrderEmail,phoneNumber, _id } = myBuyer;

    return (
        <tr>
           
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={userPhoto} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{username}</div>
                        <div className="text-sm opacity-50">{mettingLocation}</div>
                    </div>
                </div>
            </td>
            <td>
                {userOrderEmail}
                <br />
                <span className="badge badge-ghost badge-sm">{phoneNumber}</span>
            </td>
            <td>{productName}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default MyBuyersRow;