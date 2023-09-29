import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.config';


//export to use the AuthContext in use in components.
export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {

    //Getting Auth from app(firebase.config);
    const auth = getAuth(app);

    //Using useState to set the user.
    const [user, setUser] = useState(null);

    //Using a loader when user data loading.
    const [loading, setLoading] = useState(true);

    //Firebase creating account method with email & password.
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Firebase login method with email & password.
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Firebase emailVerification method to verify authentic email.
    const emailVerification = (email) => {
        return sendEmailVerification(auth.currentUser);
    }

    //Firebase profileUpdate method to set user name and user image.
    const profileUpdate = (name, img) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: img
        });
    };

    //Firebase passwordReset method to reset user password.
    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    };

    //Firebase logout method to logout.
    const logout = () => {
        return signOut(auth);
    };

    //using use effect to get current user
    useEffect(() => {
         //Firebase onAuthStateChanged method to get current user.
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            //if currentUser get. setUser in to currentUser;
            setUser(currentUser);

            //if user get the loader gets off.
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        createUser,
        login,
        emailVerification,
        logout,
        profileUpdate,
        passwordReset,
        loading,
        user
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;