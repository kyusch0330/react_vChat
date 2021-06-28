import React, {useState} from 'react';
import ChatWindow  from './ChatWindow';
import "./Chat.css";

type User = {
  id:string;
  name:string;
}

type Props = {
  users:User[];
}

type ChatLog = {
  user:User;
  chat:string;
}

export default function ChatManager(props:Props) {

  const [users, setUsers] = useState<User[]>(props.users);
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  
  const handleChatRegister = (user:User,chat:string) => {
    //객체 불변성을 위해 push 대신 concat을 사용한다.
    const newLogs = chatLogs.concat([{user: user, chat: chat}]);
    setChatLogs(newLogs);
  }

  const handleAddUser = (userInfo:string) => {

    const [id,name] = userInfo.split('&');
    const newUser = {
      id:id,
      name:name 
    }

    const isNewUser = !(users.some((user) => user.id === id));
    const newUsers = isNewUser? users.concat(newUser) : users; 

    setUsers(newUsers);

    if(isNewUser) {
      //입장 메시지
      const message:ChatLog = {
        user:{
          id:"ADMIN",
          name:"ADMIN"
        },
        chat:`${name} has entered the chat`
      }
      setChatLogs(chatLogs.concat(message));
    }
  }

  const handleQuitUser = (quitUserInfo:string) => {
    const [id,name] = quitUserInfo.split('&');
    const remainUsers = users.filter((user) => user.id !== id);
    setUsers(remainUsers);
    //퇴장 메시지
    const message:ChatLog = {
      user:{
        id:"ADMIN",
        name:"ADMIN"
      },
      chat:`${name} has left the chat`
    }
    setChatLogs(chatLogs.concat(message));
  }
  
  const chatWindows = users.map((user:User) => {
    return (
      <div className="chatWindow" key={user.id} id={`${user.id}Window`}>
        <ChatWindow  
         user={user}
         chatLogs={chatLogs}
         onRegister={handleChatRegister}
         onAddUser={handleAddUser}
         onQuitUser={handleQuitUser}
         />
      </div>
    );
  }); 
  
  return (
    <div className="chatManager">
      {chatWindows}
    </div>
  );

}
