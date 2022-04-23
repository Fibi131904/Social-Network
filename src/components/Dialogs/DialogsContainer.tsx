import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';
import Dialogs from './Dialogs';
import { sendMessageAC, updateMessageBodyAC } from '../redux/dialogs-reducer';



type  mapDispachToPropsType={
  updateNewMessageBody: ()=>void
  sendMessage:(body: any)=> void
}




const mapStateToProps = (state: AppStateType) => {
  dialogsPage: state.dialogsPage 
  return {
  }
}

let mapDispachToProps = (dispatch:Dispatch): mapDispachToPropsType => {
  return {
    updateNewMessageBody: () => {
      dispatch(updateMessageBodyAC(''))
    },
    sendMessage: (body: string) => {
      dispatch(sendMessageAC(body))
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispachToProps)(Dialogs)

// export default DialogsContainer;