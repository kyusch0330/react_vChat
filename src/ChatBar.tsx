import React from 'react';
import ChatInput from './ChatInput';
import ChatRegisterBtn from './ChatRegisterBtn' 

type Props = {
  onRegister:CallableFunction;
}
type State = {
  chat:string;
}

export default class ChatBar extends React.Component<Props,State>{
  inputRef = React.createRef<HTMLInputElement>();
  
  constructor(props:Props) {
    super(props);
    this.state = {
      chat:""
    }
  }

  handleInputChange = (chat:string) => {
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
    if(this.inputRef.current) 
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
        <ChatRegisterBtn onRegister={this.handleRegister}/>
      </div>
    );
  }
}