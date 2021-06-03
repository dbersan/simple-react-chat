import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import './style.css';

export default function SignIn({auth}) {

    const signInGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    return (
        <div className="sign-in-container">
            <div className="title">
                Sign In
            </div>
            
            <div className="options">
                <button onClick={signInGoogle}>
                    <img src="/google-icon.svg"></img>
                    <div>with Google</div>
                    
                </button>
            </div>
            
        </div>

    
    )
}
