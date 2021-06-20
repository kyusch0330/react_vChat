import React from 'react';
import { MouseEventHandler } from 'react';
type Props = {
  onRegister:MouseEventHandler;
}
export default class ChatRegisterBtn extends React.Component<Props>{

  render() {
    return (
      <div className="chatRegisterBtn">
        <button onClick={this.props.onRegister}>register</button>
      </div>
      );
    }
  }