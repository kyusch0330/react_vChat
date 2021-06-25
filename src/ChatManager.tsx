import {useState} from 'react';
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

const ChatManager = (props:Props) => {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  
  const handleChatRegister = (user:User,chat:string) => {
    //객체 불변성을 위해 push 대신 concat을 사용한다.
    const newLogs = chatLogs.concat([{user: user, chat: chat}]);

    // let newLogs = chatLogs;
    // newLogs.push({
    //   user: user, 
    //   chat: chat,
    // }); 
    //-> 작동안됨 newLogs가 chatLogs를 그대로 참조하여 push로 수정하므로 불변성이 깨져서
    //-> let newLogs = chatLogs.slice(); 처럼 복사해서 사용해야 가능
    //-> 원본 값을 똑같이 변화시키면 변한게 없다고 판단하여 렌더링이 수행되지 않음

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

export default ChatManager;

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