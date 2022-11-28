import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const UserRow = ({usr, deleteOrder, refetch}) => {
    const {name,email,userPhoto, username,productPrice, role,mettingLocation,userOrderEmail,phoneNumber, _id } = usr;

 

    const handleMakeAdmin = id => {
        
        fetch(`https://resale-clothes.vercel.app/users/admin/${id}`,{
                method: 'PUT',
            })
            .then(res => res.json())
            .then(data => {
               if(data.acknowledged){
                    toast.success('Admin make Successful')
                   refetch();
               }
                
            })
    }



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
            <td>{role}</td>
            <th>
               {role !== "admin" && <button onClick={() =>handleMakeAdmin(_id)} className="btn btn-ghost btn-xs">Make Admin</button>}
            </th>
        </tr>
    );
};

export default UserRow;