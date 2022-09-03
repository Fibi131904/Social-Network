import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';


type AddMessageFormType={

}
const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>>=(props:any)=>{
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component='textarea' name='newMessageBody' placeholder='Enter your message'/>
         
          <div><button >Send</button></div>
        </form> 
  )
}
export const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'}) (AddMessageForm)
