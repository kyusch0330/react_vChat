import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
//서버에서 가져온다고 가정
import userList from './userData'


type Props = {
  id: string;
  onAddUser:CallableFunction;
}

const InviteModal = (props:Props) => {
  
  console.log(props.id+"Window");
  const modal = document.createElement('div');
  
  useEffect(()=>{
    const window = document.getElementById(`${props.id}Window`);
    if(window !== null)
      window.appendChild(modal);
    else console.log("null");

    return function removeModal() {
      if(window !== null)
        window.removeChild(modal);
    };
  });

  const handleAddUser = (e:any) => { //임시 타입
    console.log(e.target.value);
    props.onAddUser(e.target.value)
  }
  console.log(userList[3]);
  const friendList = [
    userList[3],userList[4],userList[5],userList[6]
  ].map((friend) => {
    return (
      <li key={friend.id}>
        <button value={`${friend.id}&${friend.name}`} onClick={(e) => handleAddUser(e)}>
          {friend.name}
        </button>
      </li>
    )
  });


  return ReactDOM.createPortal(
    <div className="inviteModalContainer">
      <div className="inviteModal">
      ##$modal$##
      <ul className="friendsList">
        {friendList}
      </ul>
      </div>
    </div>,
    modal 
    );
  
}

export default InviteModal;