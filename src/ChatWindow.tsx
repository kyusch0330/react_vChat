import React from 'react';
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


export default class ChatWindow extends React.Component<Props>{
  private displayRef = React.createRef<HTMLInputElement>();

  componentDidUpdate(){
    if(this.displayRef.current){
      this.displayRef.current.scrollTop = this.displayRef.current.scrollHeight;
    }
  }

  handleChatRegister = (chat:string) => {
    this.props.onRegister(this.props.user, chat);
  }

  render(){
    const chatLogs:ChatLog[] = this.props.chatLogs;
    return (
      <React.Fragment>
        <h1 style={{color:"white"}}>{this.props.user.name}</h1>
        <div className="chatDisplay" ref={this.displayRef}>
          <ChatDisplay id={this.props.user.id} chatLogs={chatLogs}/>
        </div>
        <ChatBar onRegister={this.handleChatRegister}/>
      </React.Fragment>
    )
  }
}