import React from 'react';

type Props = {
  onInputChange:CallableFunction;
  onRegister:CallableFunction;
  inputRef:React.RefObject<HTMLInputElement>;
  value:string;
}

export default class ChatInput extends React.Component<Props>{

  handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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