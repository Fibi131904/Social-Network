import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { v1 } from 'uuid';
import { chatAPI, ChatMessageAPIType, StatusType } from './../api/chatAPI';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';

type ChatMessageType = ChatMessageAPIType & { id: string }
export type InitialStateType = typeof initialState

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'panding' as StatusType
}


export const chatReducer = (state: InitialStateType = initialState, action: ActionChatType): InitialStateType =>
{

  switch (action.type)
  {
    case 'network/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [ ...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() })) ].filter((m, index, array) => index >= array.length - 100)
      }
    case 'network/chat/STATUS_CHANGE':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }
}
export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: 'network/chat/MESSAGES_RECEIVED', payload: { messages } } as const),
  statusChanged: (status: StatusType) => ({ type: 'network/chat/STATUS_CHANGE', payload: { status } } as const),
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

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

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreater = (dispatch: Dispatch) =>
{
  if (_statusChangedHandler === null)
  {
    _statusChangedHandler = (status) =>
    {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) =>
{
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreater(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreater(dispatch))
}


export const stopMessagesListening = (): ThunkType => async (dispatch) =>
{
  chatAPI.unsubsribe('messages-received', newMessageHandlerCreater(dispatch))
  chatAPI.unsubsribe('status-changed', statusChangedHandlerCreater(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () =>
{
  chatAPI.sendMessage(message)
}


type ActionChatType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionChatType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionChatType> 
