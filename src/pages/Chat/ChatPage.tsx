import { Button, message } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import userPhoto from '../../assets/img/userPhoto.jpg'
import styles from './ChatPage.module.css'



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
  const[wsChannal, setWsChannal]=useState<WebSocket | null>(null)

  useEffect(()=>{
    function createChannal() {
  setWsChannal(
    new WebSocket(
      'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    )
  )
}
    createChannal()
     },[])

     useEffect(()=>{
wsChannal?.addEventListener('close',()=>{

})
     },[wsChannal])

  return (
    <div>
      <Messages wsChannal={wsChannal}/>
      <AddMessageForm wsChannal={wsChannal}/>
    </div>
  )
}

const Messages: React.FC<{wsChannal: WebSocket | null}> = ({wsChannal}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  useEffect(() => {
    wsChannal?.addEventListener('message', (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prefMessages) => [...prefMessages, ...newMessages])
    })
  }, [wsChannal])

  return (
    <div className={styles.messagesBlock}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  )
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


const AddMessageForm: React.FC <{wsChannal: WebSocket | null}> = ({wsChannal}) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(()=>{
    wsChannal?.addEventListener('open',()=>{
      setReadyStatus('ready')

    })
  },[wsChannal])

  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannal?.send(message)
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
      <Button onClick={sendMessage} disabled={wsChannal === null ||  readyStatus !== 'ready'}>Send</Button>
    </div>
  )
}

export default ChatPage
