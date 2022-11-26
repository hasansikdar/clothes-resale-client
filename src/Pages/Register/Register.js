import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { json, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const Register = () => {
    const [loading, seLoading] = useState(false);


    const navigate = useNavigate();

    const { createuser, updateuserProfile } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = loginData => {
        seLoading(true);
        const { name, email, password } = loginData;


        createuser(email, password)
            .then(res => {
                updateuserinformationProfile(loginData)

            })
            .catch(error => {
                console.log(error);
                toast.error(error.message)
            })
    }

    const updateuserinformationProfile = (loginData) => {
        const { name } = loginData;

        // photo uploaded
        const image = loginData.image[0]
        const formdata = new FormData();
        formdata.append('image', image);

        const url = 'https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026';
        fetch(url, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(data => {
                const imageLink = data.data.display_url;

                const userInfo = {
                    displayName: name,
                    photoURL: imageLink
                }

                updateuserProfile(userInfo)
                    .then(res => {
                        saveUserInDb(loginData, imageLink);
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error(error.message);
                    })


            })
    }

    const saveUserInDb = (loginData, imageLink) => {
        const { name, email } = loginData;
        const userInfo = {
            name,
            email,
            userPhoto:imageLink,
            seller: loginData?.seller ? 'seller': 'user',

        }

        fetch('https://resale-clothes.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    seLoading(false);
                    toast.success('user created successful')
                    navigate('/');
                }
            })
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleRegister)} action="">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload Your Photo</span>
                                </label>
                                <input {...register('image', { required: true })} type="file" className="file-input-bordered  file-input w-full max-w-xs" />
                                {errors.image && <span className='text-red-500 mt-2'>Image Required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register('name', { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500 mt-2'>Name Required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register('email', { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className='text-red-500 mt-2'>Email Required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register('password', {
                                    required: 'Password is Required',
                                    minLength: { value: 8, message: 'Password Must be 8 Charecter' },
                                    maxLength: { value: 12, message: 'Password Maximum 12 Charecter' },
                                    pattern: { value: /[.*+?^${}()|[\]\\]/g, message: 'Password Must Be Strong' }

                                })} type="password" placeholder="Password" className="input input-bordered" />
                                {errors.password && <span className='text-red-500 mt-2'>{errors?.password?.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text font-bold">Is It Your Seller Account ?</span>
                                    <input {...register('seller')} type="checkbox" className="checkbox" />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={loading} className="btn btn-primary">{loading ? <div className='text-center'><span className="btn btn-square loading"></span></div> : 'Register'}</button>
                            </div>
                            <div className='mt-4'>
                                <span>If you have an Account Please <Link to='/login' className='link text-blue-500'>Login Now</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;