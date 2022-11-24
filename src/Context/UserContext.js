import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebaseConfig';


export const AuthContext = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
    const [loading, setLoading ] = useState(true);
    const [user, setUser] = useState({});

    const createuser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateuserProfile = (updateInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo);
    }
    const resetpassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser);
                setLoading(false);
        })
        return() => {
            unsubscribe();
        }
    }, [])


    const authProfile = { user,loading, createuser,resetpassword, login, logout, updateuserProfile }

    return (
        <AuthContext.Provider value={authProfile}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;