import React from 'react';
import './Chat.css'

class ChatManager extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      chatLogs: [],
    }
  }

  handleChatRegister = (user,chat) => {
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
    const chatWindows = this.props.users.map((user) => {
      return (
        <div className="chatWindow">
          <ChatWindow  
           key={user.id}
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


class ChatWindow extends React.Component{
  constructor(props) {
    super(props);   
    this.displayRef = React.createRef();
  }

  componentDidUpdate(){
    this.displayRef.current.scrollTop = this.displayRef.current.scrollHeight;
  }

  handleChatRegister = (chat) => {
    this.props.onRegister(this.props.user, chat);
  }

  render(){
    const chatLogs = this.props.chatLogs;
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


class ChatDisplay extends React.Component{
  
  render(){
    const chatLogs = this.props.chatLogs;
    let prevUserId = undefined;

    const showLogs = chatLogs.map((chatLog) => {
      const isMyChat = (this.props.id === chatLog.user.id) ? true : false;
      const chatBoxClassName = isMyChat? "myChatBox" : "notMyChatBox";
      const chatClassName =  isMyChat ? "myChat" : "notMyChat";
      const isAnotherSpeaker = (prevUserId !== chatLog.user.id) ? true : false; 
      prevUserId = chatLog.user.id;
      return (
        <div className={chatBoxClassName}>
          {!isMyChat && (
            isAnotherSpeaker ? 
            <div className="anotherName">{chatLog.user.name}</div>
            : <div className="transAnotherName">{chatLog.user.name}</div>
          )}
          <div  className={chatClassName}> {chatLog.chat} </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        {showLogs}
      </React.Fragment>
    );
  }
}


class ChatBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      chat:"",
    }
    this.inputRef = React.createRef();
  }
  
  handleInputChange = (chat) => {
    this.setState({
      chat:chat,
    });
  }
  
  handleRegister = () => {
    if(this.state.chat === "") return;
    this.props.onRegister(this.state.chat);
    this.setState({
      chat:"",
    });
    this.inputRef.current.focus();
  }
  
  render(){
    const chat = this.state.chat;
    return(
      <div className="chatBar">
        <ChatInput 
          inputRef={this.inputRef} 
          value={chat} 
          onInputChange={this.handleInputChange}
          onRegister={this.handleRegister}/>
        <ChatRegisterButton onRegister={this.handleRegister}/>
      </div>
    );
  }
}


class ChatInput extends React.Component{

  handleChange = (e) => {
    this.props.onInputChange(e.target.value);
  }

  render(){
    return (
      <div className="chatInput">
        <input type="text" 
          ref={this.props.inputRef}
          value={this.props.value} 
          onChange={(e) => this.handleChange(e)} 
          onKeyUp={(e) => {if(e.key==='Enter') this.props.onRegister()}}>
        </input>
      </div>
      );
    }
  }
  
  class ChatRegisterButton extends React.Component{

    render() {
      return (
        <div className="chatRegisterBtn">
          <button onClick={this.props.onRegister}>register</button>
        </div>
        );
      }
    }

    export default ChatManager;