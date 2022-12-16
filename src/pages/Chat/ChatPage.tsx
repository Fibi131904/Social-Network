import { Button } from 'antd'
import React from 'react'
import userPhoto from '../../assets/img/userPhoto.jpg'

 const ChatPage:React.FC=()=>{
  return <div>
<Chat/>

  </div>
}

const Chat:React.FC=()=>{
 
  return <div>
   <Messages/>
   <AddMessageForm/>
  </div>
}

const Message:React.FC=()=>{
  const message={
    photo:userPhoto,
    autor: 'Kseniya',
    text: 'Hello friends!'
  }
  return <div>
    <img src={message.photo}/><b>{message.autor}</b>
    <br/>
    {message.text}
    <br/>
  </div>
}

const Messages:React.FC=()=>{
  const messages=[1,2,3,4]
  return <div>
  {messages.map((m:any)=><Message/>)}
  {messages.map((m:any)=><Message/>)}
  {messages.map((m:any)=><Message/>)}
  </div>
}

const AddMessageForm:React.FC=()=>{
  return <div>
   <div>
    <textarea></textarea>
   </div>
   <Button>Send</Button>
  </div>
}



export default ChatPage;