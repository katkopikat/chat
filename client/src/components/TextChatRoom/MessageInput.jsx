import { useState } from 'react';
import socket from '../../socket';

const MassageInput = ( { roomId, userName, setNewMessage }) => {
    const [message, setMessage] = useState('');

    const handleChande = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        const msg =  {
            roomId,
            author: userName,
            messageText: message,
            messageTime: new Date().getTime()
        }
        socket.emit('ROOM:SET_NEW_MESSAGE', msg);
        setNewMessage(msg);
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
            Отправить
            </button>

        </form>
    )
}

export default MassageInput;