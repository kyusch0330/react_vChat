import { MouseEventHandler } from 'react';

type Props = {
  onRegister: MouseEventHandler;
}

const ChatRegisterBtn = (props:Props) => {
  return (
    <div className="chatRegisterBtn">
      <button onClick={props.onRegister}>register</button>
    </div>
    );
}

export default ChatRegisterBtn;

// export default class ChatRegisterBtn extends React.Component<Props>{

//   render() {
//     return (
//       <div className="chatRegisterBtn">
//         <button onClick={this.props.onRegister}>register</button>
//       </div>
//       );
//     }
//   }