import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfilePageType } from '../../../types/types';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import styles from './ProfileDataForm.module.css';


const ProfileDataForm = (props: InjectedFormProps<ProfilePageType>) => {
  const { initialValues, handleSubmit, error } = props

  return (
    <div >
  <form onSubmit={handleSubmit}>
   
    {error && <div className={styles.formSummaryEerror}>
      {error}
    </div>
    }
    <div>
      <b>FullName:</b> {createField('Full name', 'fullName', [], Input)}
    </div>
    <div>
      <b>LookingForAJob</b> :
      {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
    </div>

    <div>
      <b>My professional skills</b> :
      {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
    </div>

    <div>
      <b>About me</b> : {createField('About me', 'aboutMe', [], Textarea)}
    </div>
    <div>
      <b>Contacts: </b> {Object.keys(initialValues.contacts ?? {}).map(key => {
        return <div key={key} className={styles.contact}>
          <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
        </div>
      })}
    </div>
    <div >
      <button >Save</button>
    </div>
  </form>
  </div>
  )
}

const ProfileDataFormReduxForm = reduxForm<ProfilePageType>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;