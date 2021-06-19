import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ChatManager from './Chat.js';

const users = 
[
  {id: "id_james", name: "james"},
  {id: "id_lucas", name: "lucas"},
  {id: "id_eleven", name: "eleven"},
  {id: "id_steve", name: "steve"},
];

ReactDOM.render(
  <React.StrictMode>
    <ChatManager users={users}/>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
