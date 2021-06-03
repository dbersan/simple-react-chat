import React, {useState, useEffect} from 'react'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

import './App.css';
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'

const firebaseConfig = {
  apiKey: "AIzaSyCjTf62arJANdwvEzgwV3B0fo97-YlgxHk",
  authDomain: "online-bnc-wallet.firebaseapp.com",
  projectId: "online-bnc-wallet",
  storageBucket: "online-bnc-wallet.appspot.com",
  messagingSenderId: "382201253147",
  appId: "1:382201253147:web:3a00a0f59f4d9d225417be"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25)
  let [messages] = useCollectionData(query, {idField:'id'})
  if (messages) messages.reverse()

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <div className="container">
      <div className="nav-bar">
        <div className="title">Chatbox - Cryptocoins <img src="/touchicon-180.png" alt="image" /></div>
        {user && <SignOut auth={auth}/>}
      </div>
      <div className="App">
        {user ? <ChatRoom auth={auth} messages={messages} messagesRef={messagesRef} /> : <SignIn auth={auth}/>}

      </div>
    </div>
    
  );
}

export default App;
