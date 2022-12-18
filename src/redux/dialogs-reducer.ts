import { InferActionsTypes } from './redux-store';


let initionState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Very well' },
        { id: 3, message: 'How are you?' },
    ] as Array<MessagesDataType>,
    dialogs: [
        { id: 1, name: 'Petya' },
        { id: 2, name: 'Vera', },
        { id: 3, name: 'Seva', },
    ] as Array<DialogsDataType>
}

export const dialogsReducer = (state: InitialDialogsPageType = initionState, action: ActionsType) =>
{
    switch (action.type){
        case 'network/dialogs/SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [ ...state.messages, { id: 4, message: body } ]
            }
        default:
            return state;
    }
}

export const actions = {
    sendMessageAC: (newMessageBody: string) =>({
            type: 'network/dialogs/SEND_MESSAGE',
            newMessageBody
        } as const)
    }


    export type DialogsDataType = {
        id: number
        name: string
    }
    
    export type MessagesDataType = {
        id: number
        message: string
    }
    export type ActionsType = InferActionsTypes<typeof actions>
    export type InitialDialogsPageType = typeof initionState
