import React from 'react';
type User = {
  id:string;
  name:string;
}
type ChatLog = {
  user:User;
  chat:string;
}
type Props = {
  id: string;
  chatLogs:ChatLog[];
}

const ChatDisplay = (props:Props) => {
  const chatLogs:ChatLog[] = props.chatLogs;
  let prevUserId:string = "";

  const showLogs = chatLogs.map((chatLog:ChatLog, index) => {
    const isMyChat:boolean = (props.id === chatLog.user.id) ? true : false;
    const chatBoxClassName:string = isMyChat? "myChatBox" : "notMyChatBox";
    const chatClassName:string =  isMyChat ? "myChat" : "notMyChat";
    const isAnotherSpeaker:boolean = (prevUserId !== chatLog.user.id) ? true : false; 
    prevUserId = chatLog.user.id;
    return (
      <div className={chatBoxClassName} key={index}>{/*임시로 인덱스로 키 설정 */}
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

export default ChatDisplay;
