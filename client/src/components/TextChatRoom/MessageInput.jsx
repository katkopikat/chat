import { useState } from 'react';
import socket from '../../socket';

const MassageInput = ( { roomId, userName, onSetMessage }) => {
    const [message, setMessage] = useState('');

    const handleChande = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        const currentTime = new Date();
        const msg =  {
            roomId,
            author: userName,
            messageText: message,
            messageTime: `${currentTime.getHours()}:${currentTime.getMinutes()}`
        }
        socket.emit('ROOM:SET_NEW_MESSAGE', msg);
        onSetMessage(msg);
        setMessage('');
    }

    return (
        <form className="msg__input">
            <textarea
            value={message}
            onChange={(e) => handleChande(e)}
            />
            <button
            onClick={sendMessage}
            type="button">
            Send
            </button>
        </form>
    )
}

export default MassageInput;