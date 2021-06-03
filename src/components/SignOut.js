import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";

export default function SignOut({auth}) {

    return (
    <button className="sign-out-button" onClick={() => {auth.signOut()}}>
        Sign Out
    </button>
    )
}