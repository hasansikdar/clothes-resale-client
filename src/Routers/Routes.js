import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import AddProduct from '../Pages/AddProduct/AddProduct';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import UpdateProfile from '../Pages/Profile/Profile';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ProductCategories from '../Pages/ProductCategories/ProductCategories';
import Dashboard from '../Pages/Dashboard/Dashboard';
import MyOrders from '../Pages/Dashboard/MyOrders/MyOrders';
import MyProducts from '../Pages/Dashboard/MyProducts/MyProducts';
import MyBuyers from '../Pages/Dashboard/MyBuyers/MyBuyers';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/update-profile',
                element: <UpdateProfile></UpdateProfile>
            },
            {
                path: '/productCategory/:id',
                element: <ProductCategories></ProductCategories>,
                loader: ({params}) => fetch(`https://resale-clothes.vercel.app/productCategory/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/my-orders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard',
                element: <h1 className='text-center text-5xl my-10'>DashBoard</h1>
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/my-buyers',
                element: <MyBuyers></MyBuyers>
            },
            {
                path: '/dashboard/all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/add-product',
                element: <AddProduct></AddProduct>
            }
        ]
    }
])