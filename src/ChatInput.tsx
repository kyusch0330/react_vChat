import React from 'react';

type Props = {
  onInputChange: CallableFunction; //수정하기
  onRegister: CallableFunction;
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
}

const ChatInput = (props:Props) => {

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.onInputChange(e.target.value);
  }

  return (
    <div className="chatInput">
      <input type="text" 
        ref={props.inputRef}
        value={props.value} 
        onChange={(e) => handleChange(e)} 
        onKeyUp={(e) => {if(e.key==='Enter') props.onRegister()}}>
      </input>
    </div>
  );
}

export default ChatInput;

// export default class ChatInput extends React.Component<Props>{

//   handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     this.props.onInputChange(e.target.value);
//   }

//   render(){
//     return (
//       <div className="chatInput">
//         <input type="text" 
//           ref={this.props.inputRef}
//           value={this.props.value} 
//           onChange={(e) => this.handleChange(e)} 
//           onKeyUp={(e) => {if(e.key==='Enter') this.props.onRegister()}}>
//         </input>
//       </div>
//       );
//     }
//   }