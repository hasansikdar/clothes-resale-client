import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/UserContext';
import MyBuyersRow from './MyBuyersRow';

const MyBuyers = () => {
    const { user } = useContext(AuthContext);
    const { data: myBuyers = [], loading, refetch } = useQuery({
        queryKey: ['myBuyers', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-clothes.vercel.app/myBuyers?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    // const deleteOrder = id => {
    //     const agreeDelete = window.confirm('Are you sure You want to Cancell Order');

    //     if (agreeDelete) {
    //         fetch(`https://resale-clothes.vercel.app/myBuyers/${id}`, {
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
            <h1 className="text-5xl text-center">My Buyers</h1>
            <div className='w-11/12 mt-10 mx-auto'>
                {myBuyers.length ?
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
                                    myBuyers.map(myBuyer => <MyBuyersRow key={myBuyer?._id} myBuyer={myBuyer}></MyBuyersRow>)
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
                    <h1 className='text-5xl text-center'>No Buyers Available</h1>
                }
            </div>
        </div>
    );
};

export default MyBuyers;