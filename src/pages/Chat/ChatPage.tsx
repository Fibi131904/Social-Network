import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageAPIType } from '../../api/chatAPI'
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
      {status === 'error' && <div>Some error. Please refresh the page</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className={styles.messagesBlock} onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}

      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
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
)

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
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}></textarea>
      </div>
      <Button onClick={sendMessageHandler} disabled={status !== 'ready'}>
        Send
      </Button>
    </div>
  )
}

export default ChatPage
