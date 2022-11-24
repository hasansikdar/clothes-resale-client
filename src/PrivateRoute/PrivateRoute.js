import React, { Children, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const loaction = useLocation();
    

    if(loading){
        return <div className='text-center'><button className="btn loading">loading</button></div>
    }
    
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: loaction}} replace></Navigate>


};

export default PrivateRoute;