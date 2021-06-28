import React, {useEffect, useRef} from 'react';
import ChatMenu from './ChatMenu';
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
  onAddUser:CallableFunction;
  onQuitUser:CallableFunction;
}

const ChatWindow = (props:Props) => {
  const display = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(display.current){
      display.current.scrollTop = display.current.scrollHeight;
    }
  });

  const handleChatRegister = (chat:string) => {
    props.onRegister(props.user, chat);
  }

  return (
    <React.Fragment>
      <h1 style={{color:"white"}}>{props.user.name}</h1>
      <ChatMenu
       user={props.user}
       onAddUser={props.onAddUser}
       onQuitUser={props.onQuitUser}/>
      <ChatDisplay
       id={props.user.id}
       chatLogs={props.chatLogs}
       displayRef={display}/>
      <ChatBar onRegister={handleChatRegister}/>
    </React.Fragment>
  )
}

export default ChatWindow;

