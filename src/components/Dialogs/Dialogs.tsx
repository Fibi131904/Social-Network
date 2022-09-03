import React  from 'react';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { DialogsPageType } from '../../redux/dialogs-reducer';
import { AddMessageFormRedux } from './AddMessageForm/AddMessageFormRedux';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
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
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}

      </div>
      <div className={classes.message}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

// type AddMessageFormType={

// }
// const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>>=(props:any)=>{
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <Field component='textarea' name='newMessageBody' placeholder='Enter your message'/>
         
//           <div><button >Send</button></div>
//         </form> 
//   )
// }
// export const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'}) (AddMessageForm)

export default Dialogs;