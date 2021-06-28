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
  displayRef: React.RefObject<HTMLInputElement>;
}

const ChatDisplay = (props:Props) => {
  const chatLogs:ChatLog[] = props.chatLogs;
  let prevUserId:string = "";

  const showLogs = chatLogs.map((chatLog:ChatLog, index) => {
    const isMyChat:boolean = (chatLog.user.id === props.id) ? true : false;
    const isAdmin:boolean = (chatLog.user.id === 'ADMIN');
    const chatBoxClassName:string = isMyChat? "myChatBox" : isAdmin ? "adminChatBox" : "notMyChatBox";
    const chatClassName:string =  isMyChat ? "myChat" : isAdmin ? "adminChat" : "notMyChat";
    const isAnotherSpeaker:boolean = (prevUserId !== chatLog.user.id) ? true : false; 
    prevUserId = chatLog.user.id;
    return (
      <div className={chatBoxClassName} key={index}>{/*임시로 인덱스로 키 설정 */}
        {!isMyChat && !isAdmin && (
          isAnotherSpeaker ? 
          <div className="anotherName">{chatLog.user.name}</div>
          : <div className="transAnotherName">{chatLog.user.name}</div>
        )}
        <div  className={chatClassName}> {chatLog.chat} </div>
      </div>
    );
  });

  return (
    <div className="chatDisplay" ref={props.displayRef}>
      {showLogs}
    </div>
  );
}

export default ChatDisplay;
