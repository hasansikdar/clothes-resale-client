import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const date = new Date();
    const curretDate = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    const currentTime = parseInt(date.getHours() - 12) + ':' + date.getMinutes();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // console.log(currentTime);

    const categories = [
        { name: 'men' },
        { name: 'women' },
        { name: 'baby' },
    ]


    const handleAddProduct = productValue => {
        // console.log(data);
        setLoading(true);
        const { productName,condition, productDescription, productLocation, productOriginalPrice, productSellingPrice, productUsed, productCategory } = productValue;
        const imageFile = productValue?.productImage[0];
        // console.log(imageFile);


        const formData = new FormData();
        formData.append('image', imageFile);
        const url = 'https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026';

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(ImageLink => {
                
                const productImageLink = ImageLink?.data?.display_url;
                const product = {
                    productName,
                    productDescription,
                    productLocation,
                    productOriginalPrice,
                    productSellingPrice,
                    productUsed,
                    productImage: productImageLink,
                    productCategory,
                    curretDate,
                    currentTime,
                    userName: user?.displayName,
                    userEmail: user?.email,
                    userPhoto: user?.photoURL,
                    condition,
                }



                fetch('http://localhost:5000/addProduct', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(product)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            reset();
                            setLoading(false);
                            toast.success('Product Added Successful')
                            navigate('/');
                        }

                    })

            })



    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add Product</h1>
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleAddProduct)} action="">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Photo</span>
                                </label>
                                <input accept='image/*' {...register('productImage', { required: true })} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                                {errors.name && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <input {...register('productName', { required: true })} type="text" placeholder="Product Name" className="input input-bordered" />
                                {errors.productName && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <input {...register('productLocation', { required: true })} type="text" placeholder="Product Location" className="input input-bordered" />
                                {errors.productLocation && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <input {...register('productOriginalPrice', { required: true })} type="text" placeholder="$ Product Original Price" className="input input-bordered" />
                                {errors.productOriginalPrice && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <input {...register('productSellingPrice', { required: true })} type="text" placeholder="$ Product Selling Price" className="input input-bordered" />
                                {errors.productSellingPrice && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <input {...register('productUsed', { required: true })} type="text" placeholder="Years Of Used" className="input input-bordered" />
                                {errors.productUsed && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <textarea {...register('productDescription', { required: true })} type="text" placeholder="Product Description" className="input input-bordered" />
                                {errors.productDescription && <span className='text-red-500 mt-2'>This field is required</span>}
                            </div>

                            <label htmlFor="">Select Product Condition</label>
                            <select {...register('condition', {required: true})} className="select select-bordered w-full max-w-xs">
                                <option  selected>Good</option>
                                <option>Excellent</option>
                                <option>Fair</option>
                            </select>
                            <label className="label">
                                <span className="label-text">Select Your Category</span>
                            </label>
                            {/* <option disabled selected>Select Your Category</option> */}
                            <select {...register('productCategory', { required: true })} className="select w-full border border-black max-w-xs">
                                {
                                    categories.map((category, i) => <option key={i}>{category?.name}</option>)
                                }
                            </select>
                            {errors.productCategory && <span className='text-red-500 mt-2'>This field is required</span>}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">{loading ? <div className='text-center'><span className="btn btn-square loading"></span></div> : 'Add Product'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;