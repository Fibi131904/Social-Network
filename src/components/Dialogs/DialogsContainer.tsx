import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { InitialDialogsPageType, sendMessageAC } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { AppStateType } from '../../redux/redux-store';
import { ComponentType } from 'react';


type mapStateToPropsType = {
  dialogsPage: InitialDialogsPageType
 
 
}
type mapDispachToPropsType = {
   sendMessage: (newMessageBody:string) => void
}
export type DialogsType = mapStateToPropsType & mapDispachToPropsType


let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    dialogsPage: state.dialogsPage,
   
  }
}

let mapDispachToProps = (dispatch: Dispatch): mapDispachToPropsType => {
  return {
       sendMessage: (newMessageBody:string) => {
      dispatch(sendMessageAC(newMessageBody))
    }
   
  }
}


//export const DialogsContainer = connect(mapStateToProps, mapDispachToProps)(Dialogs)
export default compose<ComponentType>(connect(mapStateToProps,  mapDispachToProps))(Dialogs)

