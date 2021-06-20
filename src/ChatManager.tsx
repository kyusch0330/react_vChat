import React from 'react';
import ChatWindow  from './ChatWindow';
import "./Chat.css";

type User = {
  id:string;
  name:string;
}

type Props = {
  users:User[];
}

type chatLog = {
  user:User;
  chat:string;
}
type State = {
  chatLogs: chatLog[];
}

export default class ChatManager extends React.Component<Props,State>{

  constructor(props:Props) {
    super(props);
    this.state = {chatLogs: []};
  }
  handleChatRegister = (user:User,chat:string) => {
    let newLogs = this.state.chatLogs;
    newLogs.push({
      user: user, 
      chat: chat,
    });
    this.setState({
      chatLogs : newLogs,
    });
  }

  render() {
    const chatWindows = this.props.users.map((user:User) => {
      return (
        <div className="chatWindow" key={user.id}>
          <ChatWindow  
           user={user}
           onRegister={this.handleChatRegister}
           chatLogs={this.state.chatLogs}
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
}