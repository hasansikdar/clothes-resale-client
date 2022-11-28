import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import IsAdmin from '../CustomHooks/IsAdmin';

const UserPrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [role, isAdminLoading] = IsAdmin(user?.email);
    const location = useLocation();

    if(loading || isAdminLoading){
        return <div className='text-center'><button className="btn loading">loading</button></div>
    }

    if(user && role?.role === 'user'){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default UserPrivateRoute;