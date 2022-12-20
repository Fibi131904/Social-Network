import { Button } from 'antd'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../api/chatAPI'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'
import styles from './ChatPage.module.css'

const ChatPage: React.FC = () => {

  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [dispatch])

  return (
    <div>
      {status === 'error'&& <div>Some error. Please refresh the page</div>}
      <>
      <Messages />
      <AddMessageForm />
      </>
      
    </div>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
const messagesAnchorRef=useRef<HTMLDivElement>(null)

useEffect(()=>{
  messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
},[messages])

  return     <div className={styles.messagesBlock}>
      {messages.map((m, index) => <Message key={index} message={m} />)}
   
  <div ref={messagesAnchorRef}></div>
  </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} className={styles.messagePhoto}/>
      <b>{message.userName}</b>
      <br />
      {message.message}
      <br />
    </div>
  )
}

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const status = useSelector((state: AppStateType) => state.chat.status)
  const dispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

 

  return (
    <div>
      <div>
        <textarea onChange={(e) =>setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <Button onClick={sendMessageHandler} disabled={status !== 'ready'}>
        Send
      </Button>
    </div>
  )
}

export default ChatPage
