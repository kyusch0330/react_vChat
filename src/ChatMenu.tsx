import { useState } from 'react';
import InviteModal from './InviteModal';

type User = {
  id:string;
  name:string;
}
type Props = {
  user:User;
  onAddUser:CallableFunction;
  onQuitUser:CallableFunction;
}

const ChatMenu = (props:Props) => {

  const [inviteModalOn,setInviteModalOn] = useState(false);

  const toggleInviteModal = () => {
    setInviteModalOn(!inviteModalOn);
  }

  
  return (
    <div className="chatMenu">
      <button onClick={toggleInviteModal}>
        invite
      </button>
      {inviteModalOn && <InviteModal
        id={props.user.id}
        onAddUser={props.onAddUser}
        onToggle={toggleInviteModal}
      />}
 
      <button onClick={()=>{
        props.onQuitUser(`${props.user.id}&${props.user.name}`);
      }}>
        quit
      </button>
    </div>
  );
}

export default ChatMenu;