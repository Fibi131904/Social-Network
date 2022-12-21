
const subscribes = {
  'messages-received': [] as MessagesRecevedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type EventsNamesType = 'messages-received' | 'status-changed'
const closeHandler = () =>
{
  notifySubscibersAboutStaus('panding')
  setTimeout(createChannal, 3000)
}
const onMessageHandler = (e: MessageEvent) =>
{
  const newMessages = JSON.parse(e.data)
  subscribes[ 'messages-received' ].forEach(s => s(newMessages))
}
const openHandler = () =>
{
  notifySubscibersAboutStaus('ready')
}
const errorHandler = () =>
{
  notifySubscibersAboutStaus('error')
  console.error('Refresh page')
}

const cleanUp = () =>
{
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', onMessageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifySubscibersAboutStaus = (status: StatusType) =>
{
  subscribes[ 'status-changed' ].forEach(s => s(status))
}

function createChannal()
{
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscibersAboutStaus('panding')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', onMessageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)

}

export const chatAPI = {
  start()
  {
    createChannal()
  },
  stop()
  {
    subscribes[ 'messages-received' ] = []
    subscribes[ 'status-changed' ] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventsNamesType, callback: MessagesRecevedSubscriberType | StatusChangedSubscriberType)
  {
    //@ts-ignore
    subscribes[ eventName ].push(callback)
    return () =>
    {
      //@ts-ignore
      subscribes[ eventName ].filter(s => s !== callback)
    }
  },
  unsubsribe(eventName: EventsNamesType, callback: MessagesRecevedSubscriberType | StatusChangedSubscriberType)
  {
    //@ts-ignore
    subscribes[ eventName ] = subscribes[ eventName ].filter(s => s !== callback)
  },
  sendMessage(message: string)
  {
    ws?.send(message)
  }
}


type MessagesRecevedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageAPIType = {
  message: string
  photo: string
  userId: number
  userName: string
}
export type StatusType = 'panding' | 'ready' | 'error'
