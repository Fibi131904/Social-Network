import React  from 'react';
import { Redirect } from 'react-router-dom';
import { InitialDialogsPageType } from '../../redux/dialogs-reducer';
import { AddMessageFormRedux } from './AddMessageForm/AddMessageFormRedux';
import DialogItem from './DialogItem/DialogItem';
import styles from './Dialogs.module.css';
import { Message } from './Message/Message';


type DialogsPropsType = {
  dialogsPage: InitialDialogsPageType
  isAuth: boolean
  sendMessage: (newMessageBody:string) => void
}


const Dialogs = (props: DialogsPropsType) => {
  const state = props.dialogsPage

  let dialogsElements = state.dialogs.map(d=> <DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message}key={m.id}/>);
 

  let addNewMessage = (values:any) => {
    props.sendMessage(values.newMessageBody)
    }

if (!props.isAuth) return <Redirect to={'/login'}/>

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}

      </div>
      <div className={styles.message}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs;
