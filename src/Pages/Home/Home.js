import React from 'react';
import Advertise from './Advertise/Advertise';
import ExpensiveProduct from './ExpensiveProduct/ExpensiveProduct';
import Products from './Products/Products';
import TopBanner from './TopBanner/TopBanner';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <TopBanner></TopBanner>
            <Products></Products>
            <Advertise></Advertise>
            <ExpensiveProduct></ExpensiveProduct>
        </div>
    );
};

export default Home;