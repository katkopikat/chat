import { useEffect, useRef } from 'react';
import MessageBlock from './MessageBlock';
import MessageInput from './MessageInput';
import UsersBlock from './UsersBlock';
import './TextChatRoom.css';


const TextChatRoom = ({ users, messages, userName, roomId, onSetMessage }) => {

    const messagesRef = useRef(null);

    useEffect(() => {
        console.log(messagesRef);
        messagesRef.current.scrollTo(0, 99999);
      }, [messages]);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId)
    }

    return ( 
    <div className="wrapper__chat">
        <div className="chat__header">
            <h3
            className="chat__roomid"
            onClick={copyRoomId}>Room {roomId}
            </h3>
            <UsersBlock users={ users }/>
        </div>
        <div className="chat-right">
            <div className="chat__messages" ref={messagesRef}>
                { messages.map((msg, i) => {
                    return (
                        <MessageBlock
                        userName={userName}
                        author={msg.author}
                        messageText={msg.messageText}
                        messageTime={msg.messageTime}
                        key={i}
                        />
                        )
                    }
                )}
            </div>
            <MessageInput userName={userName} roomId={roomId} onSetMessage={onSetMessage}/>
        </div>
    </div>
    )
}


export default TextChatRoom;