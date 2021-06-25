import {useState, useRef} from 'react';
import ChatInput from './ChatInput';
import ChatRegisterBtn from './ChatRegisterBtn' 

type Props = {
  onRegister:CallableFunction;
}

const ChatBar = (props:Props) => {
  
  const [chat,setChat] = useState("");
  const handleInputChange = (chat:string) => {
    setChat(chat);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const handleRegister = () => {
    if(chat === "") return;
    props.onRegister(chat);
    setChat("");
    if(inputRef.current)
      inputRef.current.focus();
  }

  return(
    <div className="chatBar">
      <ChatInput 
        inputRef={inputRef} 
        value={chat} 
        onInputChange={handleInputChange}
        onRegister={handleRegister}/>
      <ChatRegisterBtn onRegister={handleRegister}/>
    </div>
  );
}

export default ChatBar;

