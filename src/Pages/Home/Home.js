import React from 'react';
import ExpensiveProduct from './ExpensiveProduct/ExpensiveProduct';
import TopBanner from './TopBanner/TopBanner';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <TopBanner></TopBanner>
            <ExpensiveProduct></ExpensiveProduct>
        </div>
    );
};

export default Home;