import { Button, message } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import userPhoto from '../../assets/img/userPhoto.jpg'
import styles from './ChatPage.module.css';

const wsChannal= new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export type ChatMessageType = {
message: string
photo: string
userId: number
userName: string
}
 const ChatPage: React.FC = () => {
   return (
     <div>
       <Chat />
     </div>
   )
 }

const Chat: React.FC = () => {
 
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Message: React.FC<{message:ChatMessageType}> = ({message}) => {
  
  
    return (
    <div>
      <img src={message.photo} className={styles.messagePhoto} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  useEffect(() => {
    wsChannal.addEventListener('message', (e:MessageEvent) => {
     let newMessages= JSON.parse(e.data)
      setMessages((prefMessages)=>[...prefMessages, ... newMessages])
    })
  }, [])

  return (
    <div className={styles.messagesBlock}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
     
    </div>
  )
}

const AddMessageForm:React.FC=()=>{
  const[message,setMessage]=useState('')
const sendMessage=()=>{
  if(!message){
    return
  }
  wsChannal.send(message)
  setMessage('')
}
const onChangeMessageClick=(e:ChangeEvent<HTMLTextAreaElement>)=>{
setMessage(e.currentTarget.value)

}
  return <div>
   <div>
    <textarea onChange={onChangeMessageClick}value={message}></textarea>
   </div>
   <Button onClick={sendMessage}>Send</Button>
  </div>
}



export default ChatPage;