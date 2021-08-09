import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import './style.css';

export default function SignIn({auth}) {

    const signInGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
        
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("Signed in!")
            window.location.reload();

          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log("Login Error!")
            // ...
          });
        
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
