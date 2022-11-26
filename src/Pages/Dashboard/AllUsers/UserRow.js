import React from 'react';

const UserRow = ({usr, deleteOrder}) => {
    const {name,email,userPhoto, username,productPrice,seller,mettingLocation,userOrderEmail,phoneNumber, _id } = usr;

    console.log(usr)

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
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{mettingLocation}</div>
                    </div>
                </div>
            </td>
            <td>
                {email}
                <br />
                <span className="badge badge-ghost badge-sm">{phoneNumber}</span>
            </td>
            <td>{seller}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default UserRow;