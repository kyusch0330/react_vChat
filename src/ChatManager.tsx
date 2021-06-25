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
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  
  const handleChatRegister = (user:User,chat:string) => {
    //객체 불변성을 위해 push 대신 concat을 사용한다.
    const newLogs = chatLogs.concat([{user: user, chat: chat}]);

    // let newLogs = chatLogs;
    // newLogs.push({
    //   user: user, 
    //   chat: chat,
    // }); //-> 작동안됨
    setChatLogs(newLogs);
  }
  
  const chatWindows = props.users.map((user:User) => {
    return (
      <div className="chatWindow" key={user.id}>
        <ChatWindow  
         user={user}
         onRegister={handleChatRegister}
         chatLogs={chatLogs}
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

// export default class ChatManager extends Component<Props,State>{

//   constructor(props:Props) {
//     super(props);
//     this.state = {chatLogs: []};
//   }
//   handleChatRegister = (user:User,chat:string) => {
//     let newLogs = this.state.chatLogs;
//     newLogs.push({
//       user: user, 
//       chat: chat,
//     });
//     this.setState({
//       chatLogs : newLogs,
//     });
//   }

//   render() {
//     const chatWindows = this.props.users.map((user:User) => {
//       return (
//         <div className="chatWindow" key={user.id}>
//           <ChatWindow  
//            user={user}
//            onRegister={this.handleChatRegister}
//            chatLogs={this.state.chatLogs}
//            />
//         </div>
//       );
//     }); 

//     return (
//       <div className="chatManager">
//         {chatWindows}
//       </div>
//     );
//   }
// }