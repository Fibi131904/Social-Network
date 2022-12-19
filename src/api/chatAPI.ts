
let subscribes = [] as SubscribeType[]

let ws: WebSocket | null = null
const closeHandler = () => {
  setTimeout(createChannal, 3000)
}
const onMessageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribes.forEach(s=>s(newMessages))
 }

function createChannal() {
  ws?.removeEventListener('close', closeHandler)
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', onMessageHandler)
 
}

export const chatAPI = {
  start(){
    createChannal()
  },
  stop(){
    subscribes = [] 
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', onMessageHandler)
    ws?.close()
    
  },
  subscribe(callback: SubscribeType)
  {
    subscribes.push(callback)
    return ()=>{
      subscribes=subscribes.filter(s=>s !== callback)
    }
  },
  unsubsribe(callback:SubscribeType){
  subscribes= subscribes.filter(s=> s== callback)
},
sendMessage(message:string){
  ws?.send(message)
}
}


type SubscribeType = (messages: ChatMessageType[]) => void
export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}