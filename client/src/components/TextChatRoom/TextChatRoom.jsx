import MessageBlock from './MessageBlock';
import MessageInput from './MessageInput';
import UsersBlock from './UsersBlock';
import './TextChatRoom.css';


const TextChatRoom = ({ users, messages, userName, roomId, setNewMessage }) => {

    return ( 
    <div className="wrapper__chat">
        <div className="chat__header">
            <h3>Room {roomId}</h3>
            <UsersBlock users={ users }/>
        </div>
        <div className="chat-right">
            <div className="chat__messages">
                { messages.map((msg, i) => {
                    return (
                        <MessageBlock
                        author={msg.author}
                        messageText={msg.messageText}
                        messageTime={msg.messageTime}
                        key={i}
                        />
                        )
                    }
                )}
            </div>
            <MessageInput userName={userName} roomId={roomId} setNewMessage={setNewMessage}/>
        </div>
    </div>
    )
}


export default TextChatRoom;