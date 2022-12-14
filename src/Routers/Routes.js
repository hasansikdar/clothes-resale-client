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
import AdminPrivateRoute from '../PrivateRoute/AdminPrivateRoute';
import SellerPrivateRoute from '../PrivateRoute/SellerPrivateRoute';
import UserPrivateRoute from '../PrivateRoute/UserPrivateRoute';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Blogs from '../Pages/Blogs/Blogs';

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
                element: <PrivateRoute><ProductCategories></ProductCategories></PrivateRoute>,
                loader: ({params}) => fetch(`https://resale-clothes.vercel.app/productCategory/${params.id}`)
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/my-orders',
                element: <UserPrivateRoute><MyOrders></MyOrders></UserPrivateRoute>
            },
            {
                path: '/dashboard',
                element: <h1 className='text-center text-5xl my-10'>DashBoard</h1>
            },
            {
                path: '/dashboard/my-products',
                element: <SellerPrivateRoute><MyProducts></MyProducts></SellerPrivateRoute>
            },
            {
                path: '/dashboard/my-buyers',
                element: <SellerPrivateRoute><MyBuyers></MyBuyers></SellerPrivateRoute>
            },
            {
                path: '/dashboard/all-users',
                element: <AdminPrivateRoute><AllUsers></AllUsers></AdminPrivateRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerPrivateRoute><AddProduct></AddProduct></SellerPrivateRoute>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])