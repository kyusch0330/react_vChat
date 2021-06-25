import React, {useEffect, useRef} from 'react';
import ChatDisplay from './ChatDisplay'; 
import ChatBar from './ChatBar'; 

type User = {
  id:string;
  name:string;
}
type ChatLog = {
  user:User;
  chat:string;
}
type Props = {
  user: User;
  chatLogs:ChatLog[];
  onRegister:CallableFunction;
}

const ChatWindow = (props:Props) => {
  const displayRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(displayRef.current){
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  });

  const handleChatRegister = (chat:string) => {
    props.onRegister(props.user, chat);
  }


  const chatLogs:ChatLog[] = props.chatLogs;
  return (
    <React.Fragment>
      <h1 style={{color:"white"}}>{props.user.name}</h1>
      <div className="chatDisplay" ref={displayRef}>
        <ChatDisplay id={props.user.id} chatLogs={chatLogs}/>
      </div>
      <ChatBar onRegister={handleChatRegister}/>
    </React.Fragment>
  )
}

export default ChatWindow;

