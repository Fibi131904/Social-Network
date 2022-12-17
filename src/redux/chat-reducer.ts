import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType } from './../api/chatAPI';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { ThunkDispatch } from 'redux-thunk';

export type InitialStateType= typeof initialState
const initialState= {
     messages:[] as ChatMessageType[]
}





export const chatReducer = (state: InitialStateType =initialState, action: ActionChatType): InitialStateType => {

    switch (action.type) {
        case  'network/chat/MESSAGES_RECEIVED' :
            return {
                ...state,
                messages:{...state.messages, ...action.payload}
            }
        default:
            return state
    }
}
export const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({ type: 'network/chat/MESSAGES_RECEIVED', payload: { messages } } as const)
}

let _newMessageHandler:((messages:ChatMessageType[])=>void) | null = null

const newMessageHandlerCreater = (dispatch: Dispatch) =>
{
  if (_newMessageHandler === null)
  {
    _newMessageHandler = (messages) =>
    {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

export const startMessagesListening= (): ThunkType => async (dispatch) => {
   chatAPI.subscribe(newMessageHandlerCreater(dispatch))
   }
  

export const stopMessagesListening= (): ThunkType => async (dispatch) => {
 chatAPI.unsubscribe(newMessageHandlerCreater(dispatch))
   }

export const sendMessage= (message:string): ThunkType => async (dispatch) => {
 chatAPI.sendMessage(message)
  
}

 
 type ActionChatType = InferActionsTypes<typeof actions>
 type ThunkType= BaseThunkType<ActionChatType >
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionChatType> 