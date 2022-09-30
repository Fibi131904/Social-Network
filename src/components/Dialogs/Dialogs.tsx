import React  from 'react';
import { Redirect } from 'react-router-dom';
import { DialogsPageType } from '../../redux/dialogs-reducer';
import { AddMessageFormRedux } from './AddMessageForm/AddMessageFormRedux';
import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Message from './Message/Message';

type DialogsPropsType = {
  dialogsPage: DialogsPageType
  isAuth: boolean
  sendMessage: (newMessageBody:string) => void
}


const Dialogs = (props: DialogsPropsType) => {
  const state = props.dialogsPage

  let dialogsElements = state.dialogs.map(d=><DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message}key={m.id}/>);
 

  let addNewMessage = (values:any) => {
    props.sendMessage(values.newMessageBody)
    }

if (!props.isAuth) return <Redirect to={'/login'}/>

  return (
    <div className={style.dialogs}>
      <div className={style.dialogsItems}>
        {dialogsElements}

      </div>
      <div className={style.message}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs;