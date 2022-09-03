import React from 'react';
import classes from './Message.module.css'


type MessagePropsType ={
  message: string
}

const Message = (props: MessagePropsType)=><div className={classes.message}>{props.message}</div>
 




export default Message;