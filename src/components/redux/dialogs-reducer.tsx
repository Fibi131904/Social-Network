import { ActionType, DialogsPageType } from "./store";

const SEND_MESSAGE = "SEND_MESSAGE"
const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY"

export const dialogsReducer = (state: DialogsPageType, action: ActionType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.message, { id: 6, message: body }]
            }
        default:
            return state;
    }

}

    export const sendMessageAC = (messageText: string) => {
        return {
            type: SEND_MESSAGE,
            messageText: messageText
        } as const
    }
    export const updateMessageBodyAC = (updateText: string) => {
        return {
            type: UPDATE_MESSAGE_BODY,
            updateText: updateText
        } as const
    }
