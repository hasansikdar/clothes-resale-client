import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/UserContext';
import UserRow from './UserRow';

const AllUsers = () => {
    const { user } = useContext(AuthContext);
    const { data: users = [], loading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://resale-clothes.vercel.app/allUsers`);
            const data = await res.json();
            return data;
        }
    })


    // const deleteOrder = id => {
    //     const agreeDelete = window.confirm('Are you sure You want to Cancell Order');

    //     if (agreeDelete) {
    //         fetch(`https://resale-clothes.vercel.app/users/${id}`, {
    //             method: 'DELETE',
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 if (data.acknowledged) {
    //                     toast.success('Order Cancelled Successfull');
    //                     refetch()
    //                 }
    //             })
    //     }
    // }

    return (
        <div className='my-14'>
            <h1 className="text-5xl text-center">All Users</h1>
            <div className='w-11/12 mt-10 mx-auto'>
                {users.length ?
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Product Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(usr => <UserRow refetch={refetch} key={usr?._id} usr={usr}></UserRow>)
                                }
                            </tbody>

                            <tfoot>
                                <tr className='w-full'>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                    :
                    <h1 className='text-5xl text-center'>No Users Available</h1>
                }
            </div>
        </div>
    );
};

export default AllUsers;