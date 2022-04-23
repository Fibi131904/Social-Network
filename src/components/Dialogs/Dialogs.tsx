import React, { ChangeEvent } from 'react';
import DialogItem from '../DialogItem/DialogItem';
import Message from '../Message/Message';
import { DialogsPageType} from '../redux/store';
import classes from './../Dialogs.module.css';

type DialogPropsType= {
  updateNewMessageBody: (updateText: string)=>void
  sendMessage:  (messageText: string) => void
  dialogsPage: DialogsPageType

}


const Dialogs = (props: DialogPropsType) => {
  let state = props.dialogsPage

  let dialogsElements = state.dialogs.map(d=><DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.message.map(m => <Message message={m.message}key={m.id}/>);
let newMessageBody= state.newMessageBody


  let onSendMessageClick = () => {
    props.sendMessage('')
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
          <div><textarea value={props.dialogsPage.newMessageBody}
            onChange={onNewMessageChange} placeholder='Enter your message'></textarea> </div>
          <div><button onClick={onSendMessageClick}>Send</button></div>
        </div>
      </div>
    </div>
  )

}



export default Dialogs;