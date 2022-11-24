import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const UpdateProfile = () => {

    const { updateuserProfile, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const Profile = loginData => {
        setLoading(true);
        updateuserinformationProfile(loginData);
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
                const imageLink = data?.data?.display_url;

                const userInfo = {
                    displayName: name,
                    photoURL: imageLink
                }

                updateuserProfile(userInfo)
                    .then(res => {
                        setLoading(false);
                        toast.success('Profile Update Success');
                        navigate('/')
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error(error.message);
                    })


            })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Update Profile!</h1>
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(Profile)} action="">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload Your Photo</span>
                                </label>
                                <input {...register('image')} type="file" className="file-input-bordered  file-input w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input defaultValue={user?.displayName} {...register('name')} type="text" placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input defaultValue={user?.email} readOnly {...register('email')} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={loading} className="btn btn-primary">{loading ? <div className='text-center'><span className="btn btn-square loading"></span></div>: 'Update'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;