import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatManager from './ChatManager';

import userList from './userData';

const users = [userList[0],userList[1],userList[2]];

ReactDOM.render(
  <React.StrictMode>
    <ChatManager users={users}/>
  </React.StrictMode>,
  document.getElementById('root')
);

