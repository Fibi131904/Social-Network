import React from 'react'
import styles from './Message.module.css'

type MessagePropsType = {
  message: string
}

export const Message = (props: MessagePropsType) => (
  <div className={styles.message}>{props.message}</div>
)
