import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DialogsPageType, sendMessageAC, updateNewMessageBodyAC } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { AppStateType } from '../../redux/redux-store';
import { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


type mapStateToPropsType = {
  dialogsPage: DialogsPageType
 
 
}
type mapDispachToPropsType = {
  updateNewMessageBody: (updateText: string) => void
  sendMessage: () => void
}
export type DialogsType = mapStateToPropsType & mapDispachToPropsType


let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    dialogsPage: state.dialogsPage,
   
  }
}

let mapDispachToProps = (dispatch: Dispatch): mapDispachToPropsType => {
  return {
    updateNewMessageBody: (updateText: string) => {
      dispatch(updateNewMessageBodyAC(updateText))
    },
    sendMessage: () => {
      dispatch(sendMessageAC())
    }
  }
}
let AuthRedirectComponent= withAuthRedirect(Dialogs); // hoc

//export const DialogsContainer = connect(mapStateToProps, mapDispachToProps)(Dialogs)
export default compose<ComponentType>(connect(mapStateToProps,  mapDispachToProps))(AuthRedirectComponent)

