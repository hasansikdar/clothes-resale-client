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
                path: '/add-product',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
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
                loader: ({params}) => fetch(`http://localhost:5000/productCategory/${params.id}`)
            }
        ]
    }
])