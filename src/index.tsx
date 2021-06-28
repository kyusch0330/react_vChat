import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatManager from './ChatManager';

import userList from './userData';

const users = [userList[0],userList[1],userList[2]];
// [
//   {id: "id_james", name: "james"},
//   {id: "id_lucas", name: "lucas"},
//   {id: "id_eleven", name: "eleven"},
//   {id: "id_steve", name: "steve"},
// ];

ReactDOM.render(
  <React.StrictMode>
    <ChatManager users={users}/>
  </React.StrictMode>,
  document.getElementById('root')
);

