import React, {useState, useRef} from 'react'
import firebase from "firebase/app";

import './style.css';

function ChatMessage(props){
    const {text, uid, photoURL} = props.message
    const sameUser = uid === props.auth.currentUser.uid
    let messageClass = sameUser? 'sent':'received'
    messageClass = 'message '+ messageClass

    let messageDiv
    if(!sameUser)
    {
        messageDiv = <div className={messageClass}>
                        <div className="profile-pic"><img src={photoURL} /></div>
                        <div className="message-text">
                            {text}
                        </div>
                    </div>
    } else{
        messageDiv = <div className={messageClass}>
                        <div className="message-text">
                            {text}
                        </div>
                        <div className="profile-pic"><img src={photoURL} /></div>
                    </div>
    }

    return (
        <div className="message-section">
            {messageDiv}
        </div>
        
    )
}

export default function ChatRoom({auth, messages, messagesRef}) {

    const [inputText, setInputText] = useState('')
    const dummy = useRef()

    function updateText(e){
        const text = e.target.value
        setInputText(text)
    }

    const sendMessage = async(e) => {
        e.preventDefault()
        if (inputText == '') return
        const textHolder = inputText
        setInputText('')

        const {uid, photoURL} = auth.currentUser
        await messagesRef.add({
            text: textHolder,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        dummy.current.scrollIntoView({behavior: 'smooth'})
        
    }

    return (
    <div className="chatbox">
        <div className="messages">
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth} />)}
            <div ref={dummy}></div>
        </div>
        
        <form onSubmit={sendMessage} className="message-form">
            <div className="text-input">
                <input type="text" value={inputText} onChange={updateText} />
            </div>
            <button className="send-button" type="submit">send</button>
        </form>
    </div>
    )
}
