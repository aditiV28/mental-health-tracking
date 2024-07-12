import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Main from './Main';

import './SignIn.css';


const SignIn = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/current_user', {withCredentials: true})
        .then(response => {
            setUser(response.data);
        });
    }, []);

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            window.location.href = 'http://localhost:5000/auth/google';
        },
        onError: error => {
            console.log('Login failed', error);
        }
    });

    const handleLogout = () => {
    googleLogout();
    setUser(null);
  }; 

    return(
        <div className='signin_container'>
            {user ? (
                <div>
                    <h3>Welcome, {user.displayName}</h3>
                    <div className="signout">
                        <Button variant="primary" type="submit" className='signout_button' onClick={handleLogout}>Sign Out</Button>
                    </div>
                    <Main />                    
                </div>
            ) : (
                <div className="landing_area">
                    <Button variant="primary" type="submit" className="signin_button" onClick={() => login()}>Sign in using Google</Button>
                </div>
            )}
        </div>
    );
};

const SignInWrapper = () => (
    <GoogleOAuthProvider clientId='457943988376-b6el1p02d1iibpq69gsj22qc9bpihubu.apps.googleusercontent.com'>
        <SignIn />
    </GoogleOAuthProvider>
)

export default SignInWrapper;
