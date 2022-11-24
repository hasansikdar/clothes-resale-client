import React from 'react';

const ExpensiveProduct = () => {
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
                <img className='w-1/2' src="https://media.gq.com/photos/57eaa2989c577e122a48a96d/master/w_1600%2Cc_limit/loewe-tshirt.jpg" />
                <div>
                    <h1 className="text-5xl font-bold">Most Expensive Brand T-shirt</h1>
                    <p className="py-6">People like Team India's dashing batsman Virat Kohli very much and he does wonders in the field, but his fashion outside is no less. Let us tell you that Virat's fans are present not only in the country but also abroad. Yes, and If Virat does anything, fans follow him. Let us tell you that Virat's lifestyle is also quite different and he is fond of expensive vehicles and watches.</p>
                    <a target='_blank' href="https://english.newstracklive.com/news/virat-kohli-dress-price-ta322-1258336-1.html"><button className="btn btn-primary">Read More</button></a>
                </div>
            </div>
        </div>
    );
};

export default ExpensiveProduct;