import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const Dashboard = () => {
    return (
        <div>
            <div className="navbar shadow">
                <div className="flex-1">
                    <Link to='/' className='btn btn-ghost normal-case text-xl'>CLOTHES RESALE</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to='/dashboard/my-orders'>My Orders</Link></li>
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
                        <li><Link to='/dashboard/all-users'>All Users</Link></li>
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