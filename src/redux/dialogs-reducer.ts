

const SEND_MESSAGE = 'SEND_MESSAGE'

export type DialogsDataType = {
  id: number
  name: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type ActionsType = ReturnType<typeof sendMessageAC>

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
export type InitialDialogsPageType = typeof initionState
export const dialogsReducer = (state: InitialDialogsPageType = initionState, action: ActionsType) => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 4, message: body }]
            }
        default:
            return state;
    }
}

export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    } as const
}
   
