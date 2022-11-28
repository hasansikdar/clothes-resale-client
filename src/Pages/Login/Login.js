import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { FaGoogle } from "react-icons/fa";



const Login = () => {
    const { login,signinwithgoogle, resetpassword } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = loginData => {
        const { email, password } = loginData;
        setLoading(true);
        login(email, password)
            .then(res => {
                toast.success('Login Success');
                setLoading(false);
                navigate(from, { replace: false });
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message);
                setLoading(false);
            })
    }
    



    const handleResetPassword = () => {
        const email = window.prompt('Pease Enter your Email');

        if (email) {
            resetpassword(email)
                .then(res => {
                    alert('Please Check your Email And Reset Your Password');
                })
                .catch(error => {
                    console.log(error)
                    toast.error(error.message);
                });
        }
    }


    const handleGoogleLogin  = () => {
        signinwithgoogle()
        .then(res => {
            const user = res.user;
            checkedUserAvailable(user);
        })
        .catch(error => {
            toast.error(error.message);
            console.log(error);
        })
    }

    const checkedUserAvailable = user => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            if(data.length){
                toast.success('Login Successful');
                return navigate('/');
            }
            saveUserInDb(user);
        })
    }



    const saveUserInDb = (loginData) => {
        const { displayName, email,photoURL } = loginData;
        const userInfo = {
            name: displayName,
            email,
            seller: 'user',
            userPhoto:photoURL,
        }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('user created successful')
                    navigate('/');
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleLogin)} action="">
                        <div className="card-body">
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
                                <label className="label">
                                    <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={loading} className="btn btn-primary">{loading ? <div className='text-center'><span className="btn btn-square loading"></span></div> : 'Login'}</button>
                            </div>
                        </div>
                    </form>
                    <div className='mx-8 mb-5'>
                        <div className="form-control mt-6">
                            <button onClick={handleGoogleLogin} className="btn btn-primary"><FaGoogle className='mr-5 text-blue-500'></FaGoogle> Google</button>
                        </div>
                        <div className='mt-4'>
                            <span>If you have not Account Please <Link to='/register' className='link text-blue-500'>Create New Account</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;