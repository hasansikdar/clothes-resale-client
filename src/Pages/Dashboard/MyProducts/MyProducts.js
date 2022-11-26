import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/UserContext';
import MyProductRow from './MyProductRow';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: myProducts = [], loading, refetch } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-clothes.vercel.app/myProducts?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })



    

    const deleteMyProduct = id => {
        const agreeDelete = window.confirm('Are you sure You want to Cancell Order');

        if (agreeDelete) {
            fetch(`https://resale-clothes.vercel.app/myProducts/${id}`, {
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

    return (
        <div className='my-10'>
            <h1 className="text-5xl text-center">My Products</h1>
            <div className='w-11/12 mt-10 mx-auto'>
                {myProducts.length ?
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
                                    myProducts.map(product => <MyProductRow deleteMyProduct={deleteMyProduct} key={product?._id} product={product}></MyProductRow>)
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
                    <h1 className='text-5xl text-center'>No Product Available</h1>
                }
            </div>
        </div>
    );
};

export default MyProducts;