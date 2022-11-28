import React, { useContext, useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import IsAdmin from '../../CustomHooks/IsAdmin';
import Footer from '../Shared/Footer/Footer';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [role, isAdminLoading] = IsAdmin(user?.email);

    
    if(isAdminLoading){
        return <h1 className='text-center text-5xl'>Loading...</h1>
    }

    return (
        <div>
            <div className="navbar shadow">
                <div className="flex-1">
                    <Link to='/' className='btn btn-ghost normal-case text-xl'>CLOTHES RESALE</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                        {role?.role === 'user' && <li><Link to='/dashboard/my-orders'>My Orders</Link></li>}
                        {role?.role === 'seller' &&
                            <>
                                <li tabIndex={0}>
                                    <Link to=''>
                                        Parent
                                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                    </Link>
                                    <ul className="p-2 bg-base-100">
                                        <li className=''><Link to='/dashboard/my-products'>My Products</Link></li>
                                        <li><Link to='/dashboard/my-buyers'>My Buyers</Link></li>
                                    </ul>
                                </li>
                                <li><Link to='/dashboard/add-product'>Add Product</Link></li>
                            </>}
                        {role?.role === 'admin' && <li><Link to='/dashboard/all-users'>All Users</Link></li>}
                    </ul>
                </div>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;