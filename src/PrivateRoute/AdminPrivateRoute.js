import React, {useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import IsAdmin from '../CustomHooks/IsAdmin';

const AdminPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const loaction = useLocation();

    const [role, isAdminLoading] = IsAdmin(user?.email);


    if (loading || isAdminLoading) {
        return <div className='text-center'><button className="btn loading">loading</button></div>
    }


    if (user && role?.role === 'admin') {
        return children;
    }
    return <Navigate to='/login' sate={{ from: loaction }} replace ></Navigate>
};

export default AdminPrivateRoute;