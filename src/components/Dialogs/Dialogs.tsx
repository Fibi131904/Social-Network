import React, { ChangeEvent } from 'react';
import { DialogsPageType } from '../../redux/dialogs-reducer';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

type DialogPropsType= {
  updateNewMessageBody: (updateText: string)=>void
  sendMessage:  () => void
  dialogsPage: DialogsPageType

}


const Dialogs = (props: DialogPropsType) => {
  const state = props.dialogsPage

  let dialogsElements = state.dialogs.map(d=><DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message}key={m.id}/>);
  let newMessageBody= state.newMessageBody


  let onSendMessageClick = () => {
    props.sendMessage()
  }
  let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let body = e.target.value
    props.updateNewMessageBody(body)
  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}

      </div>
      <div className={classes.message}>
        <div>{messagesElements}</div>
        <div>
          <div><textarea value={newMessageBody}
            onChange={onNewMessageChange} placeholder='Enter your message'></textarea> </div>
          <div><button onClick={onSendMessageClick}>Send</button></div>
        </div>
      </div>
    </div>
  )

}



export default Dialogs;