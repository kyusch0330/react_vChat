import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
//서버에서 가져온다고 가정
import userList from './userData'

type Props = {
  id: string;
  onAddUser:CallableFunction;
  onToggle:React.MouseEventHandler<HTMLDivElement>;
}

const InviteModal = (props:Props) => {
  
  const modal = document.createElement('div');
  
  useEffect(()=>{
    const window = document.getElementById(`${props.id}Window`);
    if(window !== null)
      window.appendChild(modal);

    return function removeModal() {
      if(window !== null)
        window.removeChild(modal);
    };
  });

  const handleAddUser = (e:any) => { //임시 타입
    props.onAddUser(e.target.value)
  }
  const friendList = [
    userList[3],userList[4],userList[5],userList[6],userList[7]
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
      <div className="inviteModalBackground" onClick={props.onToggle}>
        {/*모달창 여백을 누를 시 버블링으로 인해 꺼지는 것 방지*/}
        <div className="inviteModal" onClick={(e)=>e.stopPropagation()}>
          select Friends
          <ul className="friendsList">
            {friendList}
          </ul>
        </div>  
      </div>
    </div>,
    modal 
    );
  
}

export default InviteModal;