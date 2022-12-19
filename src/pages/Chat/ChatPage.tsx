import { Button} from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../api/chatAPI'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'
import styles from './ChatPage.module.css'


const ChatPage: React.FC = () => {
  return  <div>
      <Chat />
    </div>  
}

const Chat: React.FC = () => {

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(startMessagesListening())
  return ()=>{
    dispatch(stopMessagesListening())
  }
},[])

  return <div>
      <Messages  />
      <AddMessageForm  />
    </div>
  }

const Messages: React.FC<{}> = ({}) => {

 const messages = useSelector((state: AppStateType) =>state.chat.messages)

  return  <div className={styles.messagesBlock}>
      {messages.map((m:any, index:number) => 
        <Message key={index} message={m} />)}
    </div>  
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
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

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  const dispatch=useDispatch()


  const sendMessageHandler = () => {
    if (!message) {
      return
    }
   dispatch(sendMessage(message))
    setMessage('')
  }

  const onChangeMessageClick = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
  }

  return (
    <div>
      <div>
        <textarea onChange={onChangeMessageClick} value={message}></textarea>
      </div>
      <Button
        onClick={sendMessageHandler}
        disabled={false}>
        Send
      </Button>
    </div>
  )
}

export default ChatPage
