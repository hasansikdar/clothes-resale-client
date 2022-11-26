import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/UserContext';
import OrderRow from './OrderRow';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: myOrders = [], loading, refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-clothes.vercel.app/myOrders?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })


    const deleteOrder = id => {
        const agreeDelete = window.confirm('Are you sure You want to Cancell Order');

        if (agreeDelete) {
            fetch(`https://resale-clothes.vercel.app/myOrders/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        toast.success('Order Cancelled Successfull');
                        refetch()
                    }
                })
        }
    }

    if(loading){
        return <h1 className='text-center text-5xl'>Loading...</h1>
    }



    return (
        <div className='my-14'>
            <h1 className="text-5xl text-center">My Orders</h1>
            <div className='w-11/12 mt-10 mx-auto'>
                {myOrders.length ?
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myOrders.map(order => <OrderRow deleteOrder={deleteOrder} key={order?._id} order={order}></OrderRow>)
                                }
                            </tbody>

                            <tfoot>
                                <tr className='w-full'>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </tfoot>

                        </table>
                    </div>
                    :
                    <h1 className='text-5xl text-center'>No Orders Available</h1>
                }
            </div>
        </div>
    );
};

export default MyOrders;