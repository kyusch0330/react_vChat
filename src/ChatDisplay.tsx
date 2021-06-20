import React from 'react';
type User = {
  id:string;
  name:string;
}
type chatLog = {
  user:User;
  chat:string;
}
type Props = {
  id: string;
  chatLogs:chatLog[];
}

export default class ChatDisplay extends React.Component<Props>{
  
  render(){
    const chatLogs = this.props.chatLogs;
    let prevUserId = "";

    const showLogs = chatLogs.map((chatLog:chatLog) => {
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